import { faker } from "@faker-js/faker";
import { createInstance } from "../../../src";
import { AssetsCountBody } from "../../../src/domain/asset/types/asset-count-body";
import { PODApi } from "../../../src/domain/common/interface/pod.api";
import { Response } from "../../../src/domain/common/types/response";
import { CREDENTIALS, HOST } from "../credentials";

describe("POD Http client especification", () => {
  let podClient: PODApi;

  let response: Response<AssetsCountBody>;

  describe("Get count count assets method with wrong credentials", () => {
    beforeAll(async () => {
      podClient = createInstance({
        ...CREDENTIALS,
        password: faker.internet.password(),
        host: HOST,
      });
      response = await podClient.asset.getAssetsCount(
        faker.string.uuid(),
        "active,inactive,suspended",
      );
    });

    test("response data payload is well defined", () => {
      return expect(response).toHaveProperty("data");
    });

    test("response data.inactive is undefined", () => {
      return expect(response.data.inactive).toBe(undefined);
    });

    test("response data.suspended is undefined", () => {
      return expect(response.data.suspended).toBe(undefined);
    });

    test("response data.active is undefined", () => {
      return expect(response.data.active).toBe(undefined);
    });

    test("response status code to be 401", () => {
      return expect(response).toHaveProperty("status", 401);
    });
    test("response statusText to be Unauthorized", () => {
      return expect(response).toHaveProperty("statusText", "Unauthorized");
    });
  });
});
