import { PermissionPayload } from "../types/permission-payload";
import { AccountIdVO } from "./account-id.vo";

/**
 * Account id value object
 * @class
 */
export class PermissionVO {
  private readonly accountIdVO: AccountIdVO;
  private readonly _roles: string[];
  constructor(params: PermissionPayload) {
    this.accountIdVO = new AccountIdVO(params.accountId);
    this._roles = params.roles;
  }

  /**
   * Create a new instance of PermissionVO
   * @param {PermissionPayload} params
   * @returns {PermissionVO} the new PermissionVO instance
   */
  static create(params: PermissionPayload): PermissionVO {
    return new PermissionVO(params);
  }

  get value(): PermissionPayload {
    return {
      accountId: this.accountIdVO.value,
      roles: this._roles,
    };
  }
}
