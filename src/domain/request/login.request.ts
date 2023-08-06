import { LoginPayload } from "../types/login-payload";
import { PasswordVO } from "../vo/password.vo";
import { UsernameVO } from "../vo/username.vo";
import { BaseRequest } from "./base.request";

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

  get username(): string {
    return this._username.value;
  }

  get password(): string {
    return this._password.value;
  }
}
