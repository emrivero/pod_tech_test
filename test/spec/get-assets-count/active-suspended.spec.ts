import { createInstance } from "../../../src";
import { AssetsCountBody } from "../../../src/domain/asset/types/asset-count-body";
import { PODApi } from "../../../src/domain/common/interface/pod.api";
import { Response } from "../../../src/domain/common/types/response";
import { ACCOUNT_ID, CREDENTIALS, HOST } from "../credentials";

describe("POD Http client especification", () => {
  let podClient: PODApi;

  let response: Response<AssetsCountBody>;

  describe("Get number of active and suspended count assets method", () => {
    beforeAll(async () => {
      podClient = createInstance({
        ...CREDENTIALS,
        host: HOST,
      });
      response = await podClient.asset.getAssetsCount(
        ACCOUNT_ID,
        "active,suspended",
      );
    });

    test("response data payload is well defined", () => {
      return expect(response).toHaveProperty("data");
    });

    test("response data.inactive is greater or equal than 0", () => {
      return expect(response.data.inactive).toBe(undefined);
    });

    test("response data.suspended is greater or equal than 0", () => {
      return expect(response.data.suspended).toBeGreaterThanOrEqual(0);
    });

    test("response data.active is greater or equal than 0", () => {
      return expect(response.data.active).toBeGreaterThanOrEqual(0);
    });

    test("response status code to be 200", () => {
      return expect(response).toHaveProperty("status", 200);
    });
    test("response statusText to be OK", () => {
      return expect(response).toHaveProperty("statusText", "OK");
    });
  });
});
