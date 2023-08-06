import { ValidateResult } from "../../common/types/validate-result";
import { GenericVO } from "../../common/vo/generic.vo";
import { StatusType } from "../types/create-user-payload";

/**
 * Status value object
 * @extends {GenericVO<string>}
 * @class
 */
export class StatusVO extends GenericVO<StatusType> {
  constructor(value: StatusType) {
    super(value, "Status");
  }

  isValid(): ValidateResult {
    const emailRegexp = new RegExp(/active|inactive/);
    const valid = emailRegexp.test(this.value);

    if (!valid) {
      return {
        isValid: false,
        message: "must be a active or inactive",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  }
}
