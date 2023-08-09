import { AssetBody } from "../../domain/asset/types/asset-body";
import { AssetsCountBody } from "../../domain/asset/types/asset-count-body";
import { FilterPayload } from "../../domain/asset/types/filter-payload";
import { HttpClient } from "../../domain/common/interface/http.client";
import { PaginateResponse } from "../../domain/common/types/paginate-response";
import { Response } from "../../domain/common/types/response";
import { LoginPayload } from "../../domain/login/types/login-payload";
import { StatusType } from "../../domain/user/types/create-user-payload";
import { GetAllAssetsService } from "./get-all-assets.service";

/**
 * Get assets count service
 * @class
 */
export class GetAssetsCountService {
  private readonly getAllAssetsService: GetAllAssetsService;
  constructor(private readonly httpClient: HttpClient) {
    this.getAllAssetsService = new GetAllAssetsService(httpClient);
  }

  /**
   * Get assets count with certain status: active, inactive, suspended
   * @param {string} accountId
   * @param {LoginPayload} loginPayload
   * @param {} filter
   * @returns {Promise<Response<AssetsCountBody>>} the assets count response
   */
  async getAssetsCount(
    accountId: string,
    loginPayload: LoginPayload,
    filter: FilterPayload,
  ): Promise<Response<AssetsCountBody>> {
    const response = await this.getAllAssetsService.getAllAssets(
      accountId,
      loginPayload,
      filter,
    );

    if (response.status !== 200) {
      return {
        data: {},
        status: response.status,
        statusText: response.statusText,
      };
    }

    const countObservable = this.getCount(response, filter);

    return {
      ...response,
      data: countObservable,
    };
  }

  /**
   * Get assets count with certain status: active, inactive, suspended
   * @param response the response
   * @returns {AssetsCountBody} the assets count response
   */
  getCount(
    response: PaginateResponse<AssetBody>,
    filter: FilterPayload,
  ): AssetsCountBody {
    const keys = filter.split(",") as StatusType[];
    const result: AssetsCountBody = {};
    const {
      data: { payload },
    } = response;

    keys.forEach((key) => {
      result[key] = 0;
    });

    payload.forEach((asset) => {
      const { status } = asset;
      const currentCount = result[status];

      if (currentCount !== undefined) {
        result[status] = currentCount + 1;
      }
    });

    return result;
  }
}
