import { ValidateResult } from "../types/validate-result";
import { GenericVO } from "./generic.vo";

/**
 * Host value object
 * @extends {GenericVO<string>}
 * @class
 */
export class HostVO extends GenericVO<string> {
  constructor(value: string) {
    super(value, "Host");
  }

  isValid(): ValidateResult {
    const httpsRegexp = new RegExp(/^https?:\/\/[^ "]+$/);
    const valid = httpsRegexp.test(this.value);

    if (!valid) {
      return {
        isValid: false,
        message: "must be a valid URL",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  }
}
