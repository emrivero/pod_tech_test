import { HttpClient } from "./http.client";
import { LoginRequest } from "./request/login.request";
import { LoginBody } from "./types/login-body";
import { PODClientOptions } from "./types/pod.client.options";
import { Response } from "./types/response";

/**
 * PODClient class
 * @param {PODClientOptions} options
 * @param {HttpClient} httpClient
 *
 */
export class PODClient {
  constructor(
    private options: PODClientOptions,
    private httpClient: HttpClient,
  ) {}

  /**
   * Login to the api
   * @returns {Promise<Response<LoginBody>>} the login response
   */
  login(): Promise<Response<LoginBody>> {
    const { host, username, password } = this.options;

    const payload = new LoginRequest({
      password,
      username,
      host,
    });

    const response = this.httpClient.login(payload);

    return response;
  }
}
