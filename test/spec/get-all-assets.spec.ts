import { AssetBody } from "../../src/domain/asset/types/asset-body";
import { PODApi } from "../../src/domain/common/interface/pod.api";
import { PaginateResponse } from "../../src/domain/common/types/paginate-response";
import { createInstance } from "../../src/index";
import { ACCOUNT_ID, CREDENTIALS, HOST } from "./credentials";

describe("POD Http client especification", () => {
  const podClient: PODApi = createInstance({
    ...CREDENTIALS,
    host: HOST,
  });

  let response: PaginateResponse<AssetBody>;

  test("Expect POD Http client to be defined.", () => {
    expect(podClient).toBeDefined();
  });

  describe("Get all assets method", () => {
    beforeAll(async () => {
      response = await podClient.asset.getAll(ACCOUNT_ID);
    });

    test("response data payload is instanceof array", () => {
      return expect(response.data.payload).toBeInstanceOf(Array);
    });

    test("response data count is well defined", () => {
      return expect(response).toHaveProperty(
        "data.count",
        response.data.payload.length,
      );
    });

    test("response status code to be 200 and statusText to be OK", () => {
      return expect(response).toHaveProperty("status", 200);
    });
    test("response statusText to be OK", () => {
      return expect(response).toHaveProperty("statusText", "OK");
    });
  });
});
