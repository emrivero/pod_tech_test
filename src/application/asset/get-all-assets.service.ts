import { Observable, map, range, switchMap, toArray } from "rxjs";
import { PaginateRequest } from "../../domain/asset/request/paginate.request";
import { AssetBody } from "../../domain/asset/types/asset-body";
import { FilterPayload } from "../../domain/asset/types/filter-payload";
import { HttpClient } from "../../domain/common/interface/http.client";
import { PaginateResponse } from "../../domain/common/types/paginate-response";
import { Response } from "../../domain/common/types/response";
import { LoginRequest } from "../../domain/login/request/login.request";
import { LoginPayload } from "../../domain/login/types/login-payload";
import { PageNthPayload } from "./types/page-nth-payload";

/**
 * Get all assets service
 * @class
 */
export class GetAllAssetsService {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Create a user
   * @param {string} accountId
   * @param {LoginPayload} loginPayload
   * @returns {Promise<Response<PaginateResponse<AssetBody>>>} the user response
   */
  async getAllAssets(
    accountId: string,
    loginPayload: LoginPayload,
    filter?: FilterPayload,
  ): Promise<PaginateResponse<AssetBody>> {
    const responses = await this.executeIterations(
      accountId,
      loginPayload,
      filter,
    );

    const response = this.mapResponsesToResponse(responses);

    return response;
  }

  /**
   * Recursive get all assets
   * @param {number} iteration the iteration
   * @param {string} accountId the account id
   * @param {LoginPayload} loginPayload the login payload
   * @param {FilterPayload} filter the filter
   * @returns {Observable<{ isEmpty: boolean; responses: Response<AssetBody[]>[] }>} the response
   */
  private executeIterations(
    accountId: string,
    loginPayload: LoginPayload,
    filter?: FilterPayload,
    iteration = 0,
    accum = [] as Response<AssetBody[]>[],
  ): Promise<Response<AssetBody[]>[]> {
    const login = new LoginRequest(loginPayload);

    return new Promise((resolve, reject) => {
      this.getNPagesAsset(accountId, login, iteration, filter).subscribe({
        next: async ({ isEmpty, responses }) => {
          if (isEmpty) {
            resolve(accum.concat(responses));
            return;
          }
          const result = await this.executeIterations(
            accountId,
            loginPayload,
            filter,
            iteration + 1,
            responses,
          );
          resolve(result);
        },
        error: reject,
      });
    });
  }

  /**
   * Get the n-th page asset
   * @param {HttpClient} httpClient
   * @param {string} accountId
   * @param {LoginPayload} loginPayload
   * @param {number} page
   * @param {FilterPayload} filter
   * @param {number} numberOfRequest
   * @returns {Promise<Response<AssetBody[]>>} the user response
   */
  getNPagesAsset(
    accountId: string,
    login: LoginRequest,
    iteration = 0,
    filter?: FilterPayload,
    numberOfRequest = 4,
  ): Observable<{
    isEmpty: boolean;
    responses: Response<AssetBody[]>[];
  }> {
    const createPage = (page: number) =>
      this.createNPageRequest({
        accountId,
        filter,
        limit: 50,
        page,
      });

    return range(
      numberOfRequest * iteration + 1,
      numberOfRequest * (iteration + 1),
    ).pipe(
      map(createPage),
      switchMap((paginate) => this.httpClient.paginateAssets(paginate, login)),
      toArray(),
      map((responses) => ({
        responses,
        isEmpty:
          responses.every((response) => response.data.length === 0) ||
          responses.some((response) => response.status !== 200),
      })),
    );
  }

  /**
   * Create a n-th page request
   * @param {PageNthPayload} param0 the payload
   * @returns {PaginateRequest<{ status?: FilterPayload }>} the request
   */
  createNPageRequest({
    accountId,
    filter,
    limit,
    page,
  }: PageNthPayload): PaginateRequest<{ status?: FilterPayload }> {
    return new PaginateRequest<{ status?: FilterPayload }>({
      limit,
      page,
      accountId,
      filter: filter ? { status: filter } : {},
    });
  }

  /**
   * Map responses to response
   * @param {Response<AssetBody[]>[]} responses the responses
   * @returns {PaginateResponse<AssetBody>} the response
   */
  private mapResponsesToResponse(
    responses: Response<AssetBody[]>[],
  ): PaginateResponse<AssetBody> {
    const errorResponse = responses.find((response) => response.status !== 200);
    if (errorResponse) {
      return {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        data: {
          count: 0,
          payload: [],
        },
      };
    }
    const flatResponses = responses.map((response) => response.data).flat();

    return {
      status: 200,
      statusText: "OK",
      data: {
        count: flatResponses.length,
        payload: flatResponses,
      },
    };
  }
}
