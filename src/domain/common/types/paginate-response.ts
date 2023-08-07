export type PaginateResponse<T> = {
  data: {
    count: number;
    payload: T[];
  };
  status: number;
  statusText: string;
};
