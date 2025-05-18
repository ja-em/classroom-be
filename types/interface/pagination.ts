export interface IPaginationResponse<T> {
  items: T[];
  totalItem: number;
  totalPage: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
