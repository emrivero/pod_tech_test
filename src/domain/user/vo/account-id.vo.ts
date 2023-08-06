import { ValidateResult } from "../../common/types/validate-result";
import { NotEmptyStringVO } from "../../common/vo/not-empty-string.vo";

/**
 * Account id value object
 * @extends {NotEmptyStringVO}
 * @class
 */
export class AccountIdVO extends NotEmptyStringVO {
  constructor(value: string) {
    super(value, "AccountId");
  }

  isValid(): ValidateResult {
    return super.isValid();
  }
}
