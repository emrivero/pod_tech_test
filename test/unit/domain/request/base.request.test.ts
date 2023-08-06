import { BaseRequest } from "../../../../src/domain/request/base.request";
import { BasePayload } from "../../../../src/domain/types/base-payload";

describe("Login Request class", () => {
  const mockPayload: BasePayload = {
    host: "https://testurl.com",
  };

  it("should return the correct host using getter", () => {
    const baseInstance = new BaseRequest(mockPayload);

    expect(baseInstance.host).toBe(mockPayload.host);
  });
});
