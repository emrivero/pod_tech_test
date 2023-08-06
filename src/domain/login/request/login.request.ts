import { BaseRequest } from "../../common/request/base.request";
import { PasswordVO } from "../../common/vo/password.vo";
import { UsernameVO } from "../../common/vo/username.vo";
import { LoginPayload } from "../types/login-payload";

/**
 * Login request class.
 * @class
 * @extends {BaseRequest}
 */
export class LoginRequest extends BaseRequest {
  private readonly _username: UsernameVO;
  private readonly _password: PasswordVO;
  constructor(params: LoginPayload) {
    super(params);

    this._username = new UsernameVO(params.username);
    this._password = new PasswordVO(params.password);
  }

  /**
   * Get the username
   * @returns {string} the username
   */
  get username(): string {
    return this._username.value;
  }

  /**
   * Get the password
   * @returns {string} the password
   */
  get password(): string {
    return this._password.value;
  }
}
