import { HttpClient } from "../../domain/common/interface/http.client";
import { Response } from "../../domain/common/types/response";
import { LoginRequest } from "../../domain/login/request/login.request";
import { LoginBody } from "../../domain/login/types/login-body";
import { LoginOptions } from "./login.options";

export class LoginService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Login to the api
   * @returns {Promise<Response<LoginBody>>} the login response
   */
  login(options: LoginOptions): Promise<Response<LoginBody>> {
    const { host, username, password } = options;

    const payload = new LoginRequest({
      password,
      username,
      host,
    });

    const response = this.httpClient.login(payload);

    return response;
  }
}
