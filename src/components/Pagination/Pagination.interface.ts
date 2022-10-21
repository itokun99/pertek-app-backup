export interface IPagingState {
  /**
   * Currect page active by custom state
   * @type number
   * @example 1
   */
  page: number;
  /**
   * Current limit per view by custom state
   * @type number
   * @example 50
   */
  limit: number;
}

export interface IPaginationProperties {
  /**
   * The type of how pagination handle the page changed
   * http-hook => trigger router to add query params when page changed.
   * state-callback => trigger the callback function when page changed.
   * @default 'http-hook'
   */
  type?: "http-hook" | "state-callback";
  /**
   * redux total or total of data
   * @type number
   * @example 0
   */
  total: number;
  /**
   * Configuration initial limit per page
   * @type number
   * @default 50
   */
  initialLimit?: number;
  /**
   * If response API dont provide total
   * And still need using pagination
   * @type boolean
   * @default false
   */
  isForcePagination?: boolean;
  /**
   * The handle callback and calling when page changed
   * and props type is state-callback
   * The effect is also that total data will not appear
   */
  handler?: (page: number, limit: number) => void;
  /**
   * Make paging active with manual state
   */
  pagingState?: IPagingState;
  /**
   * Extra text before pagination limit option
   */
  paginationOptionsText?: string;
}
