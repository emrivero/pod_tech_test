import { FilterPayload } from "../../../domain/asset/types/filter-payload";

/**
 * Page n-th payload
 * @typedef {Object} PageNthPayload
 * @property {number} limit
 * @property {number} page
 * @property {string} accountId
 * @property {FilterPayload} filter
 */
export type PageNthPayload = {
  limit: number;
  page: number;
  accountId: string;
  filter?: FilterPayload;
};
