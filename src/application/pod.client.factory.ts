import { HttpClient } from "../domain/common/interface/http.client";
import { PODApi } from "../domain/common/interface/pod.api";
import { PODClientOptions } from "../domain/common/types/pod.client.options";
import { AxiosHttpClient } from "../infrastructure/http-client/axios/axios.http-client";
import { AssetModule } from "./asset/asset.module";
import { GetAllAssetsService } from "./asset/get-all-assets.service";
import { GetAssetsCountService } from "./asset/get-count-body.service";
import { AuthModule } from "./auth/auth.module";
import { LoginService } from "./auth/login.service";
import { PODClient } from "./pod-client";
import { CreateUserService } from "./user/create-user.service";
import { UserModule } from "./user/user.module";

/**
 * POD client factory class.
 * @class
 */
export class PODClientFactory {
  /**
   * Create a PODClient instance
   * @param {PODClientOptions} options
   * @returns
   */
  static create(options: PODClientOptions): PODApi {
    return new PODClient(
      options,
      this.createAuthModule(),
      this.createUserModule(),
      this.createAssetModule(),
    );
  }

  /**
   *  Create a HttpClient instance
   * @returns {HttpClient}
   */
  private static createHttpClient(): HttpClient {
    return new AxiosHttpClient();
  }

  /**
   * Create a UserModule instance
   * @param httpClient
   * @returns {UserModule}
   */
  private static createUserModule(): UserModule {
    const httpClient = this.createHttpClient();
    const createUserService = new CreateUserService(httpClient);

    return {
      createUser: createUserService.createUser.bind(createUserService),
    };
  }

  /**
   * Create an AuthModule instance
   * @param httpClient
   * @returns {AuthModule}
   */
  private static createAuthModule(): AuthModule {
    const httpClient = this.createHttpClient();
    const loginService = new LoginService(httpClient);

    return {
      login: loginService.login.bind(loginService),
    };
  }

  /**
   * Create an AssetModule instance
   * @param httpClient
   * @returns {AssetModule}
   */
  private static createAssetModule(): AssetModule {
    const httpClient = this.createHttpClient();
    const getAllAssetsService = new GetAllAssetsService(httpClient);
    const getAssetsCountService = new GetAssetsCountService(httpClient);

    return {
      getAll: getAllAssetsService.getAllAssets.bind(getAllAssetsService),
      getAssetsCount: getAssetsCountService.getAssetsCount.bind(
        getAssetsCountService,
      ),
    };
  }
}
