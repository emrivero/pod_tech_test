import { LoginRequest } from "./request/login.request";
import { LoginBody } from "./types/login-body";
import { Response } from "./types/response";

/**
 * Http client interface
 * @interface
 */
export interface HttpClient {
  /**
   * Login to the api
   * @param payload
   * @returns {Promise<Response<LoginBody>>} the login response
   */
  login(payload: LoginRequest): Promise<Response<LoginBody>>;
}
