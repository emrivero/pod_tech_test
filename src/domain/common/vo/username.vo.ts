import { ValidateResult } from "../types/validate-result";
import { NotEmptyStringVO } from "./not-empty-string.vo";

/**
 * Username value object
 * @extends {NotEmptyStringVO}
 * @class
 */
export class UsernameVO extends NotEmptyStringVO {
  constructor(value: string) {
    super(value, "Username");
  }
  isValid(): ValidateResult {
    return super.isValid();
  }
}
