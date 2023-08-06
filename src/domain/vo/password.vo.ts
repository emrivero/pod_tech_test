import { ValidateResult } from "../types/validate-result";
import { NotEmptyStringVO } from "./not-empty-string.vo";

/**
 * Password value object
 * @extends {NotEmptyStringVO}
 * @class
 */
export class PasswordVO extends NotEmptyStringVO {
  constructor(value: string) {
    super(value, "Password");
  }

  protected isValid(): ValidateResult {
    return super.isValid();
  }
}
