import { PaginateRequest } from "../../domain/asset/request/paginate.request";
import { AssetBody } from "../../domain/asset/types/asset-body";
import { HttpClient } from "../../domain/common/interface/http.client";
import { PaginateResponse } from "../../domain/common/types/paginate-response";
import { Response } from "../../domain/common/types/response";
import { LoginRequest } from "../../domain/login/request/login.request";
import { LoginPayload } from "../../domain/login/types/login-payload";

/**
 * Get all assets service
 * @class
 */
export class GetAllAssetsService {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Create a user
   * @param {LoginPayload} loginPayload
   * @returns {Promise<Response<AssetBody[]>>} the user response
   */
  async getAllAssets(
    accountId: string,
    loginPayload: LoginPayload,
  ): Promise<PaginateResponse<AssetBody>> {
    let page = 1;
    let responses = await this.getNPageAsset(accountId, loginPayload, page);
    const result = this.extractResponseFromResponses(responses);
    let keepRequest = !this.thereIsEmptyResponseData(responses);

    while (keepRequest) {
      page += 1;
      responses = await this.getNPageAsset(accountId, loginPayload, page);
      keepRequest = this.thereIsEmptyResponseData(responses);
      const response = this.extractResponseFromResponses(responses);

      result.data = result.data.concat(response.data);
      result.status = response.status;
      result.statusText = response.statusText;

      if (response.status !== 200) {
        result.data = [];
        break;
      }
    }

    return {
      status: result.status,
      statusText: result.statusText,
      data: {
        count: result.data.length,
        payload: result.data,
      },
    };
  }

  /**
   * Get page asset
   * @param {LoginPayload} loginPayload
   * @returns {Promise<Response<AssetBody[]>>} the user response
   */
  private async getNPageAsset(
    accountId: string,
    loginPayload: LoginPayload,
    page: number,
    numberOfRequest = 8,
  ): Promise<Response<AssetBody[]>[]> {
    const login = new LoginRequest(loginPayload);
    const paginates = Array.from(
      { length: numberOfRequest },
      (_, i) =>
        new PaginateRequest({
          limit: 50,
          page: (page - 1) * numberOfRequest + i + 1,
          accountId,
        }),
    );

    const requests = paginates.map((paginate) =>
      this.httpClient.paginateAssets(paginate, login),
    );

    const responses = await Promise.allSettled(requests);

    return responses.map((response) => {
      if (response.status === "fulfilled") {
        return response.value;
      }

      return {
        data: [],
        status: 500,
        statusText: "Internal server error",
      };
    });
  }

  /**
   * Check if there is empty response data
   * @param {Response<AssetBody[]>[]}  resposes
   * @returns {boolean} true if there is empty response data
   */
  private thereIsEmptyResponseData(resposes: Response<AssetBody[]>[]): boolean {
    return resposes.some((response) => response.data.length === 0);
  }

  /**
   * Extract status from responses
   * @param responses
   * @returns
   */
  private extractResponseFromResponses(
    responses: Response<AssetBody[]>[],
  ): Response<AssetBody[]> {
    const initial = {
      data: [],
      status: 200,
      statusText: "OK",
    };

    return responses.reduce((acc, response) => {
      if (response.status === 200) {
        return {
          data: acc.data.concat(
            responses.map((response) => response.data).flat(),
          ),
          status: response.status,
          statusText: response.statusText,
        };
      }

      return acc;
    }, initial);
  }
}
