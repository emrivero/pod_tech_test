import { ValidateResult } from "../../common/types/validate-result";
import { GenericVO } from "../../common/vo/generic.vo";

/**
 * Email value object
 * @extends {GenericVO<string>}
 * @class
 */
export class EmailVO extends GenericVO<string> {
  constructor(value: string) {
    super(value, "Email");
  }

  isValid(): ValidateResult {
    const emailRegexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    const valid = emailRegexp.test(this.value);

    if (!valid) {
      return {
        isValid: false,
        message: "must be a valid email",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  }
}
