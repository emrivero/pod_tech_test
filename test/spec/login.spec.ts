import { faker } from "@faker-js/faker";
import { PODApi } from "../../src/domain/common/interface/pod.api";
import { createInstance } from "../../src/index";
import { CREDENTIALS, FAKE_CREDENTIALS, FAKE_HOST, HOST } from "./credentials";

describe("POD Http client especification", () => {
  let podClient: PODApi;

  describe("Login method", () => {
    describe("POD Http client login success", () => {
      podClient = createInstance({
        ...CREDENTIALS,
        host: HOST,
      });

      const response = podClient.auth.login();

      test("Expect POD Http client to be defined.", () => {
        return expect(podClient).toBeDefined();
      });

      test("response to be defined with valid data", () => {
        return expect(response).resolves.toHaveProperty("data");
      });

      test("response status code to be 200 and statusText to be OK", () => {
        return expect(response).resolves.toHaveProperty("status", 200);
      });
      test("response statusText to be OK", () => {
        return expect(response).resolves.toHaveProperty("statusText", "OK");
      });

      test("response data to have a valid token", () => {
        return expect(response).resolves.toHaveProperty(
          "data.token",
          expect.any(String),
        );
      });
    });

    describe("POD Http client login unauthorized", () => {
      podClient = createInstance({
        ...FAKE_CREDENTIALS,
        host: HOST,
      });
      const response = podClient.auth.login();

      test("response to be defined with empty data", () => {
        return expect(response).resolves.toHaveProperty("data", {
          code: "Unauthorized",
          message: "Username or password are incorrect.",
        });
      });

      test("response status code to be 401", () => {
        return expect(response).resolves.toHaveProperty("status", 401);
      });
      test("response statusText to be Unauthorized", () => {
        return expect(response).resolves.toHaveProperty(
          "statusText",
          "Unauthorized",
        );
      });
    });

    describe("POD Http client login error", () => {
      podClient = createInstance({
        username: faker.string.sample(10),
        password: faker.string.sample(20),
        host: FAKE_HOST,
      });

      const response = podClient.auth.login();

      test("response to be defined with empty data", () => {
        return expect(response).resolves.toHaveProperty("data", undefined);
      });

      test("response status code to be 500", () => {
        return expect(response).resolves.toHaveProperty("status", 500);
      });
      test("response statusText to be Internal Server Error", () => {
        return expect(response).resolves.toHaveProperty(
          "statusText",
          "Internal Server Error",
        );
      });
    });
  });
});
