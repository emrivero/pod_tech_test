import { AccountIdVO } from "../../user/vo/account-id.vo";
import { PaginatePayload } from "../types/paginate-payload";
import { FilterVO } from "../vo/filter.vo";
import { LimitVO } from "../vo/limit.vo";
import { PageVO } from "../vo/page.vo";

/**
 * Paginate request
 * @class
 */
export class PaginateRequest<T> {
  private readonly _page: PageVO;
  private readonly _limit: LimitVO;

  private readonly _filter: FilterVO<T>;

  private readonly _accountId: AccountIdVO;

  constructor(params: PaginatePayload<T>) {
    this._page = new PageVO(params.page);
    this._limit = new LimitVO(params.limit);
    this._accountId = new AccountIdVO(params.accountId);
    const filter = params.filter as T;
    this._filter = new FilterVO(filter);
  }

  /**
   * Get page
   * @returns {number} the page
   */
  get page(): number {
    return this._page.value;
  }

  /**
   * Get limit
   * @returns {number} the limit
   */
  get limit(): number {
    return this._limit.value;
  }

  /**
   * Get filter
   * @returns {T} the filter
   */
  get filter(): T {
    return this._filter.value;
  }

  /**
   * Get account id
   * @returns {string} the account id
   */
  get accountId(): string {
    return this._accountId.value;
  }
}
