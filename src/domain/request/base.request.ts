import { BasePayload } from "../types/base-payload";
import { HostVO } from "../vo/host.vo";

/**
 * Base request class.
 * @class
 * @abstract
 */
export class BaseRequest {
  private readonly _host: HostVO;
  constructor(params: BasePayload) {
    this._host = new HostVO(params.host);
  }

  get host(): string {
    return this._host.value;
  }
}
