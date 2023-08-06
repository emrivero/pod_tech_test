import { UserBody } from "../../user/types/create-user-body";

/**
 * Login body type
 * @typedef {Object} LoginBody
 * @param {string} token - Token
 * @param {User} user - User
 */
export type LoginBody = {
  token: string;
  user: UserBody;
};
