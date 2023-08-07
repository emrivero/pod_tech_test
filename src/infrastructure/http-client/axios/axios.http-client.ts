import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginateRequest } from "../../../domain/asset/request/paginate.request";
import { AssetBody } from "../../../domain/asset/types/asset-body";
import { PaginatePayload } from "../../../domain/asset/types/paginate-payload";
import { HttpClient } from "../../../domain/common/interface/http.client";
import { Response } from "../../../domain/common/types/response";
import { LoginRequest } from "../../../domain/login/request/login.request";
import { LoginBody } from "../../../domain/login/types/login-body";
import { LoginPayload } from "../../../domain/login/types/login-payload";
import { CreateUserRequest } from "../../../domain/user/request/create-user.request";
import { UserBody } from "../../../domain/user/types/create-user-body";
import { CreateUserPayload } from "../../../domain/user/types/create-user-payload";
import { ASSETS_ROUTE, LOGIN_ROUTE, USERS_ROUTE } from "./routes";

/**
 * Axios http client
 * @implements {HttpClient}
 * @class
 */
export class AxiosHttpClient implements HttpClient {
  /**
   * Login to the api
   * @param {LoginRequest} payload
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
   * Create a user
   * @param {CreateUserRequest} user
   * @returns {Promise<Response<UserBody>>} the user response
   */
  async createUser(
    user: CreateUserRequest,
    login: LoginRequest,
  ): Promise<Response<UserBody>> {
    const { host } = login;

    const url = this.buildUrl(host, USERS_ROUTE);

    try {
      const loginResponse = await this.login(login);

      if (loginResponse.status !== 200) {
        return {
          data: {} as UserBody,
          status: loginResponse.status,
          statusText: loginResponse.statusText,
        };
      }

      const headers = this.buildHeaders(loginResponse.data.token);
      const axiosResponse = await axios.post<
        LoginBody,
        AxiosResponse<UserBody>,
        CreateUserPayload
      >(url, user.payload, {
        headers,
      });

      return this.buildResponse(axiosResponse);
    } catch (error) {
      return this.buildError(error);
    }
  }

  /**
   * Paginate assets
   * @param {PaginateRequest<T>} paginate
   * @param {LoginRequest} login
   * @returns {Promise<Response<AssetBody>>} the assets response
   */
  async paginateAssets<T>(
    paginate: PaginateRequest<T>,
    login: LoginRequest,
  ): Promise<Response<AssetBody[]>> {
    const { host } = login;
    const { filter, limit, page, accountId } = paginate;
    const url = this.buildUrl(host, ASSETS_ROUTE);

    try {
      const loginResponse = await this.login(login);

      if (loginResponse.status !== 200) {
        return {
          data: [],
          status: loginResponse.status,
          statusText: loginResponse.statusText,
        };
      }

      const headers = this.buildHeaders(loginResponse.data.token);
      const axiosResponse = await axios.get<
        LoginBody,
        AxiosResponse<AssetBody[]>,
        PaginatePayload
      >(url, { params: { limit, page, accountId, ...filter }, headers });

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
        data: axiosError.response?.data as T,
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

  private buildHeaders(accessToken: string): Record<string, string> {
    return {
      "x-access-token": accessToken,
    };
  }
}
