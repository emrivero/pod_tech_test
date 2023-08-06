import { HttpClient } from "./domain/http.client";
import { PODClient } from "./domain/pod-client";
import { PODClientOptions } from "./domain/types/pod.client.options";
import { AxiosHttpClient } from "./lib/axios/axios.http-client";

/**
 * POD client factory class.
 * @class
 */
export class PODClientFactory {
  /**
   * Create a PODClient instance
   * @param {PODClientOptions} options
   * @returns
   */
  static create(options: PODClientOptions): PODClient {
    return new PODClient(options, this.createWithHttpClient());
  }

  /**
   *  Create a HttpClient instance
   * @returns {HttpClient}
   */
  private static createWithHttpClient(): HttpClient {
    return new AxiosHttpClient();
  }
}
