import { ValidateResult } from "../../common/types/validate-result";
import { GenericVO } from "../../common/vo/generic.vo";

/**
 * Filter value object
 * @extends {GenericVO<T>}
 * @class
 */
export class FilterVO<T> extends GenericVO<T> {
  constructor(value: T) {
    super(value, "Filter");
  }

  isValid(): ValidateResult {
    return {
      isValid: true,
      message: "",
    };
  }
}
