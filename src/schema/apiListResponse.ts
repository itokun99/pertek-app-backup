export interface APIListResponse<T> {
  itemsReceived: number;
  curPage: number;
  nextPage: number | null;
  prevPage: number | null;
  itemTotal: number;
  pageTotal: number;
  items: T[];
}
