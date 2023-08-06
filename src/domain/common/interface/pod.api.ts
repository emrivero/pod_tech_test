import { LoginBody } from "../../login/types/login-body";
import { UserBody } from "../../user/types/create-user-body";
import { CreateUserPayload } from "../../user/types/create-user-payload";
import { Response } from "../types/response";

/**
 * POD Api
 * @interface
 */
export interface PODApi {
  auth: PODAuthApi;
  user: PODUserApi;
}

export interface PODAuthApi {
  /**
   * Login to the api
   * @returns {Promise<Response<LoginBody>>} the login response
   */
  login(): Promise<Response<LoginBody>>;
}

export interface PODUserApi {
  /**
   * Create a user
   * @param {CreateUserPayload} payload
   * @returns {Promise<Response<UserBody>>} the user response
   */
  create(user: CreateUserPayload): Promise<Response<UserBody>>;
}
