import { AssetBody } from "../../domain/asset/types/asset-body";
import { PaginateResponse } from "../../domain/common/types/paginate-response";
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
}
