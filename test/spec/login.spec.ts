import { faker } from "@faker-js/faker";
import { PODClient } from "../../src/domain/pod-client";
import { createInstance } from "../../src/index";
import { CREDENTIALS, FAKE_CREDENTIALS, FAKE_URL, URL } from "./credentials";

describe("POD Http client especification", () => {
  let podClient: PODClient;

  describe("Login method", () => {
    describe("POD Http client login success", () => {
      podClient = createInstance({
        ...CREDENTIALS,
        host: URL,
      });

      const response = podClient.login();

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
        host: URL,
      });
      const response = podClient.login();

      test("response to be defined with empty data", () => {
        return expect(response).resolves.toHaveProperty("data", {});
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
        host: FAKE_URL,
      });
      const response = podClient.login();

      test("response to be defined with empty data", () => {
        return expect(response).resolves.toHaveProperty("data", {});
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
