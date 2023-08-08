import { AssetBody } from "../../domain/asset/types/asset-body";
import { AssetsCountBody } from "../../domain/asset/types/asset-count-body";
import { FilterPayload } from "../../domain/asset/types/filter-payload";
import { PaginateResponse } from "../../domain/common/types/paginate-response";
import { Response } from "../../domain/common/types/response";
import { LoginPayload } from "../../domain/login/types/login-payload";

/**
 * Asset module
 * @interface
 */
export interface AssetModule {
  /**
   * Get all assets
   * @returns {Promise<PaginateResponse<AssetBody>>} the assets response
   */
  getAll(
    accountId: string,
    loginPayload: LoginPayload,
  ): Promise<PaginateResponse<AssetBody>>;

  /**
   * Get assets count with certain status: active, inactive, suspended
   * @param {string} accountId
   * @param {} loginPayload
   * @param filter
   */
  getAssetsCount(
    accountId: string,
    loginPayload: LoginPayload,
    filter: FilterPayload,
  ): Promise<Response<AssetsCountBody>>;
}
