import { ValidateResult } from "../types/validate-result";

/**
 * Generic value object
 * @abstract
 * @class
 */
export abstract class GenericVO<T> {
  readonly value: T;
  private readonly name: string;

  /**
   * @param {T} value
   * @param {string} name
   */
  constructor(value: T, name: string) {
    this.value = value;
    this.name = name;
    this.validate();
  }

  /**
   * Return the validation result.
   * If the value is valid, the result should be:
   * {
   *  isValid: true,
   * message: ""
   * }
   * If the value is invalid, the result should be:
   * {
   * isValid: false,
   * message: "the error message"
   * }
   * @returns {ValidateResult} the validation result
   * @abstract
   */
  abstract isValid(): ValidateResult;

  /**
   * Validate the value
   * @throws {Error} if the value is invalid
   */
  private validate(): void {
    const { isValid, message } = this.isValid();

    if (!isValid) {
      throw new Error(`${this.name} ${message}`);
    }
  }
}
