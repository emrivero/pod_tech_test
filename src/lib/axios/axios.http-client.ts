import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpClient } from "../../domain/http.client";
import { LoginRequest } from "../../domain/request/login.request";
import { LoginBody } from "../../domain/types/login-body";
import { LoginPayload } from "../../domain/types/login-payload";
import { Response } from "../../domain/types/response";
import { LOGIN_ROUTE } from "./routes";

/**
 * Axios http client
 * @implements {HttpClient}
 * @class
 */
export class AxiosHttpClient implements HttpClient {
  /**
   * Login to the api
   * @param payload
   * @returns {Promise<Response<LoginBody>>} the login response
   */
  async login(payload: LoginRequest): Promise<Response<LoginBody>> {
    const { host, username, password } = payload;

    const url = this.buildUrl(host, LOGIN_ROUTE);

    try {
      const axiosResponse = await axios.post<
        LoginBody,
        AxiosResponse<LoginBody>,
        Omit<LoginPayload, "host">
      >(url, { username, password });

      return this.buildResponse(axiosResponse);
    } catch (error) {
      return this.buildError(error);
    }
  }

  /**
   * Build a url from a base url and a route
   * @param baseUrl
   * @param route
   * @returns {string} the built url
   */
  private buildUrl(baseUrl: string, route: string): string {
    const baseUrlObj = new URL(baseUrl);
    const routeUrlObj = new URL(route, baseUrlObj);
    return routeUrlObj.href;
  }

  /**
   * Build a response from an axios response
   * @param {AxiosResponse<T>} response
   * @returns {Response<T>} the built response
   */
  private buildResponse<T>(response: AxiosResponse<T>): Response<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  /**
   * Build an response error from an unknown error
   * @param {unknown} error
   * @returns {Response<T>} the built error
   */
  private buildError<T>(error: unknown): Response<T> {
    const axiosError = error as AxiosError<LoginBody>;
    if (axiosError.isAxiosError) {
      return {
        data: {} as T,
        status: axiosError.response?.status || 500,
        statusText: axiosError.response?.statusText || "Internal Server Error",
      };
    }

    return {
      data: {} as T,
      status: 500,
      statusText: `${axiosError.message} ${axiosError.code}}`,
    };
  }
}
