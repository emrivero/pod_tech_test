import { PODClient } from "../../src/domain/pod-client";
import { createInstance } from "../../src/index";

describe("POD Http client especification", () => {
  let podClient: PODClient;

  beforeEach(() => {
    podClient = createInstance({
      password: "password",
      host: "https://api.podgroup.com/api/v3/login",
      username: "username",
    });
  });

  describe("Create user method", () => {
    test("Expect POD Http client to be defined.", () => {
      expect(podClient).toBeDefined();
    });
  });
});
