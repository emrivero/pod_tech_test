import { Response } from "../../domain/common/types/response";
import { LoginBody } from "../../domain/login/types/login-body";
import { LoginOptions } from "./login.options";

/**
 * Auth module
 * @interface
 */
export interface AuthModule {
  /**
   * Login to the api
   * @param {LoginOptions} options
   * @returns {Promise<Response<LoginBody>>} the login response
   */
  login: (options: LoginOptions) => Promise<Response<LoginBody>>;
}
