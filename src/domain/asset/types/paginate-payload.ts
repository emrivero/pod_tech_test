/**
 * Payload for paginated requests
 * @param accountId - Account ID
 * @param page - Page number
 * @param limit - Limit per page
 * @param filter - Filter
 */
export type PaginatePayload<T = unknown> = {
  accountId: string;
  page: number;
  limit: number;
  filter?: T;
};
