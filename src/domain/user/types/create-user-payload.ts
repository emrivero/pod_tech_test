import { PermissionPayload } from "./permission-payload";

/**
 * Login payload type.
 * @typedef LoginPayload
 * @param {string} username - Username.
 * @param {string} password - Password.
 */
export type CreateUserPayload = {
  accountId: string;
  username: string;
  password: string;
  email: string;
  status: StatusType;
  permissions: PermissionPayload[];
};

/**
 * Status type.
 */
export type StatusType = "active" | "inactive" | "suspended";
