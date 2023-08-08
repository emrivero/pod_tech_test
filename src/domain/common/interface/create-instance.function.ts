import { PODClientOptions } from "../types/pod.client.options";
import { PODApi } from "./pod.api";

export type CreateIntanceFunction = (options: PODClientOptions) => PODApi;
