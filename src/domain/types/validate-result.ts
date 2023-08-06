/**
 * ValidateResult
 * @typedef {Object} ValidateResult
 * @param {boolean} isValid - Is valid.
 * @param {string} [message] - The error message.
 */
export type ValidateResult = {
  isValid: boolean;
  message?: string;
};
