import { CreateIntanceFunction } from "../domain/common/interface/create-instance.function";
import { PODClientFactory } from "./pod.client.factory";

/**
 * Create a PODClient instance
 *
 * @param {PODClientOptions} options - The options object
 * @returns {PODClient} - The PODClient instance
 */
export const createInstance: CreateIntanceFunction = (options) => {
  return PODClientFactory.create(options);
};
