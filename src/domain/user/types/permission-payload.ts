/**
 * Payload for permission
 * @typedef PermissionPayload
 * @param {string} accountId - Account id
 * @param {string[]} [roles] - Roles
 */
export type PermissionPayload = {
  accountId: string;
  roles: string[];
};
