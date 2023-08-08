import { AssetBody } from "../../domain/asset/types/asset-body";
import { AssetsCountBody } from "../../domain/asset/types/asset-count-body";
import { FilterPayload } from "../../domain/asset/types/filter-payload";
import { HttpClient } from "../../domain/common/interface/http.client";
import { Response } from "../../domain/common/types/response";
import { LoginPayload } from "../../domain/login/types/login-payload";
import { StatusType } from "../../domain/user/types/create-user-payload";
import { getNPageAsset } from "./get-n-page-assets";

/**
 * Get assets count service
 * @class
 */
export class GetAssetsCountService {
  constructor(private readonly httpClient: HttpClient) {}

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
    let page = 1;
    let responses = await getNPageAsset(
      this.httpClient,
      accountId,
      loginPayload,
      page,
      filter,
    );

    const data = this.initalizeResponseFromFilter(filter);
    let keepRequest = !this.thereIsEmptyResponseData(responses);
    let result = this.getCountFromResponses(responses, data);
    while (keepRequest) {
      page += 1;
      responses = await getNPageAsset(
        this.httpClient,
        accountId,
        loginPayload,
        page,
        filter,
      );
      keepRequest = this.thereIsEmptyResponseData(responses);
      const counts = this.getCountFromResponses(responses, result.data);
      result = this.sumCounts(result, counts);
    }

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
    };
  }

  /**
   * Sum counts from response
   * @param {Response<AssetsCountBody>} result
   * @param {Response<AssetsCountBody>} counts
   * @returns {Response<AssetsCountBody>} the user response
   */
  private sumCounts(
    result: Response<AssetsCountBody>,
    counts: Response<AssetsCountBody>,
  ): Response<AssetsCountBody> {
    if (result.data.active != null && counts.data.active != null) {
      result.data.active += counts.data.active;
    }
    if (result.data.inactive != null && counts.data.inactive != null) {
      result.data.inactive += counts.data.inactive;
    }
    if (result.data.suspended != null && counts.data.suspended != null) {
      result.data.suspended += counts.data.suspended;
    }
    return result;
  }

  /**
   * Get count from responses
   * @param responses
   * @param countBody
   * @returns {Response<AssetsCountBody>} the user response
   */
  private getCountFromResponses(
    responses: Response<AssetBody[]>[],
    countBody: AssetsCountBody,
  ): Response<AssetsCountBody> {
    const countResponse: Response<AssetsCountBody> = {
      data: countBody,
      status: 0,
      statusText: "",
    };

    for (const response of responses) {
      const { data, status, statusText } = response;
      countResponse.status = status;
      countResponse.statusText = statusText;
      if (status !== 200) {
        countResponse.data = {};
        break;
      }

      data.forEach((asset) => {
        this.switchCount(asset, countResponse);
      });
    }

    return countResponse;
  }

  /**
   * Modify the asset body by adding the new count according
   * to the count status filter.
   * @param {AssetBody} asset
   * @param {Response<AssetsCountBody>} countResponse
   * @returns {void}
   */
  private switchCount(
    asset: AssetBody,
    countResponse: Response<AssetsCountBody>,
  ) {
    switch (asset.status) {
      case "active":
        if (countResponse.data.active == null) {
          countResponse.data.active = 0;
        }
        countResponse.data.active += 1;
        break;
      case "inactive":
        if (countResponse.data.inactive == null) {
          countResponse.data.inactive = 0;
        }
        countResponse.data.inactive += 1;
        break;
      case "suspended":
        if (countResponse.data.suspended == null) {
          countResponse.data.suspended = 0;
        }
        countResponse.data.suspended += 1;
        break;
    }
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
   * Initalize response from filter
   * @param filter
   * @returns {AssetsCountBody} the initalized response
   */
  private initalizeResponseFromFilter(filter: FilterPayload): AssetsCountBody {
    const keys = filter.split(",") as StatusType[];
    const response: AssetsCountBody = {};
    keys.forEach((key) => {
      response[key] = 0;
    });

    return response;
  }
}
