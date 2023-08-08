import { faker } from "@faker-js/faker";
import { BaseRequest } from "../../../../../src/domain/common/request/base.request";
import { BasePayload } from "../../../../../src/domain/common/types/base-payload";

describe("Login Request class", () => {
  const mockPayload: BasePayload = {
    host: faker.internet.url({
      protocol: "https",
    }),
  };

  test("should return the correct host using getter", () => {
    const baseInstance = new BaseRequest(mockPayload);

    expect(baseInstance.host).toBe(mockPayload.host);
  });
});
