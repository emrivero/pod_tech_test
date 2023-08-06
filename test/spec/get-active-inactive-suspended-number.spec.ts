import { PODApi } from "../../src/domain/common/interface/pod.api";
import { createInstance } from "../../src/index";

describe("POD Http client especification", () => {
  let podClient: PODApi;

  beforeEach(() => {
    podClient = createInstance({
      password: "password",
      host: "https://api.podgroup.com/api/v3/login",
      username: "username",
    });
  });

  describe("Get number of active, inactive and suspended assets method", () => {
    test("Expect POD Http client to be defined.", () => {
      expect(podClient).toBeDefined();
    });
  });
});
