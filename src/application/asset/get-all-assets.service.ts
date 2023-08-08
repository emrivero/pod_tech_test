import { AssetBody } from "../../domain/asset/types/asset-body";
import { HttpClient } from "../../domain/common/interface/http.client";
import { PaginateResponse } from "../../domain/common/types/paginate-response";
import { Response } from "../../domain/common/types/response";
import { LoginPayload } from "../../domain/login/types/login-payload";
import { getNPageAsset } from "./get-n-page-assets";

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
    let responses = await getNPageAsset(
      this.httpClient,
      accountId,
      loginPayload,
      page,
    );
    const result = this.extractResponseFromResponses(responses);
    let keepRequest = !this.thereIsEmptyResponseData(responses);

    while (keepRequest) {
      page += 1;
      responses = await getNPageAsset(
        this.httpClient,
        accountId,
        loginPayload,
        page,
      );
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
