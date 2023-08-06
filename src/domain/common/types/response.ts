/**
 * Response type
 * @typedef Response
 * @param {T} data - Data
 * @param {number} status - Status
 * @param {string} statusText - Status text
 */
export type Response<T> = {
  data: T;
  status: number;
  statusText: string;
};
