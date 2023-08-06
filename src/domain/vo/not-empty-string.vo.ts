import { ValidateResult } from "../types/validate-result";
import { GenericVO } from "./generic.vo";

/**
 * Not empty string value object
 * @extends {GenericVO<string>}
 * @class
 */
export class NotEmptyStringVO extends GenericVO<string> {
  constructor(value: string, name: string) {
    super(value, name);
  }

  protected isValid(): ValidateResult {
    if (this.value === "") {
      return {
        isValid: false,
        message: "must not be empty",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  }
}
