import {
  PODApi,
  PODAuthApi,
  PODUserApi,
} from "../domain/common/interface/pod.api";
import { PODClientOptions } from "../domain/common/types/pod.client.options";
import { CreateUserPayload } from "../domain/user/types/create-user-payload";
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
}
