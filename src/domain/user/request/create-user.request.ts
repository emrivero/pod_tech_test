import { PasswordVO } from "../../common/vo/password.vo";
import { UsernameVO } from "../../common/vo/username.vo";
import { CreateUserPayload, StatusType } from "../types/create-user-payload";
import { PermissionPayload } from "../types/permission-payload";
import { AccountIdVO } from "../vo/account-id.vo";
import { EmailVO } from "../vo/email.vo";
import { PermissionVO } from "../vo/permission.vo";
import { StatusVO } from "../vo/status.vo";

/**
 * Create user request class.
 * @class
 */
export class CreateUserRequest {
  private readonly _accountId: AccountIdVO;
  private readonly _username: UsernameVO;
  private readonly _password: PasswordVO;
  private readonly _email: EmailVO;
  private readonly _status: StatusVO;
  private readonly _permissions: PermissionVO[];
  constructor(params: CreateUserPayload) {
    this._accountId = new AccountIdVO(params.accountId);
    this._username = new UsernameVO(params.username);
    this._password = new PasswordVO(params.password);
    this._email = new EmailVO(params.email);
    this._status = new StatusVO(params.status);
    this._permissions = params.permissions.map((permission) =>
      PermissionVO.create(permission),
    );
  }

  get payload(): CreateUserPayload {
    return {
      accountId: this.accountId,
      username: this.username,
      password: this.password,
      email: this.email,
      status: this.status,
      permissions: this.permissions,
    };
  }

  /**
   * Get the accountId
   * @returns {string} the accountId
   */
  get accountId(): string {
    return this._accountId.value;
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

  /**
   * Get the email
   * @returns {string} the email
   */
  get email(): string {
    return this._email.value;
  }

  /**
   * Get the status
   * @returns {StatusType} the status
   */
  get status(): StatusType {
    return this._status.value;
  }

  /**
   * Get the permissions
   * @returns {PermissionPayload[]} the permissions
   */
  get permissions(): PermissionPayload[] {
    return this._permissions.map((permission) => permission.value);
  }
}
