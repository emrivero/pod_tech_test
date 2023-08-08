import { FilterPayload } from "../domain/asset/types/filter-payload";
import {
  PODApi,
  PODAssetApi,
  PODAuthApi,
  PODUserApi,
} from "../domain/common/interface/pod.api";
import { PODClientOptions } from "../domain/common/types/pod.client.options";
import { CreateUserPayload } from "../domain/user/types/create-user-payload";
import { AssetModule } from "./asset/asset.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

/**
 * PODClient class
 * @param {PODClientOptions} options
 * @param {HttpClient} httpClient
 *
 */
export class PODClient implements PODApi {
  constructor(
    private options: PODClientOptions,
    private authModule: AuthModule,
    private userModule: UserModule,
    private assetModule: AssetModule,
  ) {}

  /**
   * PODClient auth module
   */
  get auth(): PODAuthApi {
    return {
      login: () => {
        return this.authModule.login(this.options);
      },
    };
  }

  /**
   * PODClient user module
   */
  get user(): PODUserApi {
    return {
      create: (user: CreateUserPayload) => {
        return this.userModule.createUser(user, this.options);
      },
    };
  }

  /**
   * PODClient asset module
   */
  get asset(): PODAssetApi {
    return {
      getAll: (accountId: string) => {
        return this.assetModule.getAll(accountId, this.options);
      },
      getAssetsCount: (accountId: string, filter: FilterPayload) => {
        return this.assetModule.getAssetsCount(accountId, this.options, filter);
      },
    };
  }
}
