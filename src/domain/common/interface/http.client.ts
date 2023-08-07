import { PaginateRequest } from "../../asset/request/paginate.request";
import { AssetBody } from "../../asset/types/asset-body";
import { LoginRequest } from "../../login/request/login.request";
import { LoginBody } from "../../login/types/login-body";
import { CreateUserRequest } from "../../user/request/create-user.request";
import { UserBody } from "../../user/types/create-user-body";
import { Response } from "../types/response";

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

  /**
   * Create a user
   * @param {CreateUserRequest} user
   * @param {LoginRequest} login
   * @returns {Promise<Response<UserBody>>} the user response
   */
  createUser(
    payload: CreateUserRequest,
    login: LoginRequest,
  ): Promise<Response<UserBody>>;

  /**
   * Paginate assets
   * @param {PaginateRequest<T>} paginate
   * @param {LoginRequest} login
   * @returns {Promise<Response<AssetBody[]>>} the assets response
   */
  paginateAssets<T = unknown>(
    paginate: PaginateRequest<T>,
    login: LoginRequest,
  ): Promise<Response<AssetBody[]>>;
}
