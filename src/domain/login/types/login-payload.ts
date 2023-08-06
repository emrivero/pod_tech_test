import { BasePayload } from "../../common/types/base-payload";

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
