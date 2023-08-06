import { Response } from "../../domain/common/types/response";
import { LoginPayload } from "../../domain/login/types/login-payload";
import { UserBody } from "../../domain/user/types/create-user-body";
import { CreateUserPayload } from "../../domain/user/types/create-user-payload";

/**
 * User module
 * @interface
 */
export interface UserModule {
  /**
   * Create a user
   * @param {CreateUserPayload} payload
   * @returns {Promise<Response<UserBody>>} the user response
   */
  createUser: (
    payload: CreateUserPayload,
    login: LoginPayload,
  ) => Promise<Response<UserBody>>;
}
