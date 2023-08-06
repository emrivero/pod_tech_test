import { PODApi } from "../domain/common/interface/pod.api";
import { PODClientOptions } from "../domain/common/types/pod.client.options";
import { PODClientFactory } from "./pod.client.factory";

/**
 * Create a PODClient instance
 *
 * @param {PODClientOptions} options - The options object
 * @returns {PODClient} - The PODClient instance
 */
export const createInstance = (options: PODClientOptions): PODApi => {
  return PODClientFactory.create(options);
};
