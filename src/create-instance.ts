import { PODClient } from "./domain/pod-client";
import { PODClientOptions } from "./domain/types/pod.client.options";
import { PODClientFactory } from "./pod.client.factory";

/**
 * Create a PODClient instance
 *
 * @param {PODClientOptions} options - The options object
 * @returns {PODClient} - The PODClient instance
 */
export const createInstance = (options: PODClientOptions): PODClient => {
  return PODClientFactory.create(options);
};
