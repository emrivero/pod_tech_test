import { ValidateResult } from "../../common/types/validate-result";
import { GenericVO } from "../../common/vo/generic.vo";

/**
 * Limit value object
 * @extends {GenericVO<number>}
 * @class
 */
export class LimitVO extends GenericVO<number> {
  constructor(value: number) {
    super(value, "Limit");
  }

  isValid(): ValidateResult {
    const valid = this.value > 0;
    if (!valid) {
      return {
        isValid: false,
        message: "must be a greater than 0",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  }
}
