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
    let number = 1;
    let response = await this.getPageAsset(accountId, loginPayload, number);

    const result = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };

    while (response.data.length > 0) {
      number += 1;
      response = await this.getPageAsset(accountId, loginPayload, number);
      result.data = result.data.concat(response.data);
      result.status = response.status;
      result.statusText = response.statusText;

      // If the response is not 200, break the loop
      // and return the error response
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
  private getPageAsset(
    accountId: string,
    loginPayload: LoginPayload,
    page: number,
  ): Promise<Response<AssetBody[]>> {
    const login = new LoginRequest(loginPayload);

    const paginate = new PaginateRequest({ limit: 50, page, accountId });

    const response = this.httpClient.paginateAssets(paginate, login);

    return response;
  }
}
