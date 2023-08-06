import { BasePayload } from "./base-payload";

/**
 * Login payload type.
 * @typedef LoginPayload
 * @param {string} username - Username.
 * @param {string} password - Password.
 */
export type LoginPayload = BasePayload & {
  username: string;
  password: string;
};
