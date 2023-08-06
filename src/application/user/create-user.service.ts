import { HttpClient } from "../../domain/common/interface/http.client";
import { Response } from "../../domain/common/types/response";
import { LoginRequest } from "../../domain/login/request/login.request";
import { LoginPayload } from "../../domain/login/types/login-payload";
import { CreateUserRequest } from "../../domain/user/request/create-user.request";
import { UserBody } from "../../domain/user/types/create-user-body";
import { CreateUserPayload } from "../../domain/user/types/create-user-payload";

/**
 * Create user service
 * @class
 */
export class CreateUserService {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Create a user
   * @param {CreateUserPayload} payload
   * @returns {Promise<Response<UserBody>>} the user response
   */
  createUser(
    payload: CreateUserPayload,
    loginPayload: LoginPayload,
  ): Promise<Response<UserBody>> {
    const user = new CreateUserRequest(payload);
    const login = new LoginRequest(loginPayload);

    const response = this.httpClient.createUser(user, login);

    return response;
  }
}
