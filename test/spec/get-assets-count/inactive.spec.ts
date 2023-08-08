import { createInstance } from "../../../src";
import { AssetsCountBody } from "../../../src/domain/asset/types/asset-count-body";
import { PODApi } from "../../../src/domain/common/interface/pod.api";
import { Response } from "../../../src/domain/common/types/response";
import { ACCOUNT_ID, CREDENTIALS, HOST } from "../credentials";

describe("POD Http client especification", () => {
  let podClient: PODApi;

  let response: Response<AssetsCountBody>;

  describe("Get number of inactive count count assets method", () => {
    beforeAll(async () => {
      podClient = createInstance({
        ...CREDENTIALS,
        host: HOST,
      });
      response = await podClient.asset.getAssetsCount(ACCOUNT_ID, "inactive");
    });

    test("response data payload is well defined", () => {
      return expect(response).toHaveProperty("data");
    });

    test("response data.inactive is greater or equal than 0", () => {
      return expect(response.data.inactive).toBeGreaterThanOrEqual(0);
    });

    test("response data.suspended is undefined", () => {
      return expect(response.data.suspended).toBe(undefined);
    });

    test("response data.active is undefined", () => {
      return expect(response.data.active).toBe(undefined);
    });

    test("response status code to be 200", () => {
      return expect(response).toHaveProperty("status", 200);
    });
    test("response statusText to be OK", () => {
      return expect(response).toHaveProperty("statusText", "OK");
    });
  });
});
