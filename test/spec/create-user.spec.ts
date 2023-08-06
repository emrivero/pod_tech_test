import { faker } from "@faker-js/faker";
import { PODApi } from "../../src/domain/common/interface/pod.api";
import { Response } from "../../src/domain/common/types/response";
import { UserBody } from "../../src/domain/user/types/create-user-body";
import { CreateUserPayload } from "../../src/domain/user/types/create-user-payload";
import { createInstance } from "../../src/index";
import { createUserPayload } from "./create-user-payload";
import { CREDENTIALS, HOST } from "./credentials";

describe("POD Http client especification", () => {
  const podClient: PODApi = createInstance({
    ...CREDENTIALS,
    host: HOST,
  });

  let userPayload: CreateUserPayload;
  let response: Response<UserBody>;

  test("Expect POD Http client to be defined.", () => {
    expect(podClient).toBeDefined();
  });

  describe("Create user method with status active success", () => {
    beforeAll(async () => {
      userPayload = createUserPayload();

      response = await podClient.user.create(userPayload);
    });

    test("response to be defined with valid data", () => {
      expect(response).toHaveProperty("data");
    });

    test("response to be defined with valid data email", () => {
      expect(response).toHaveProperty("data.email", userPayload.email);
    });

    test("response to be defined with valid data username", () => {
      expect(response).toHaveProperty("data.username", userPayload.username);
    });

    test("response to be defined with valid data status", () => {
      expect(response).toHaveProperty("data.status", userPayload.status);
    });

    test("response to be defined with valid data permissions", () => {
      expect(response).toHaveProperty(
        "data.permissions",
        userPayload.permissions,
      );
    });

    test("response status code to be 200 and statusText to be OK", () => {
      return expect(response).toHaveProperty("status", 200);
    });
    test("response statusText to be OK", () => {
      return expect(response).toHaveProperty("statusText", "OK");
    });
  });

  describe("Create user method with status inactive success", () => {
    beforeAll(async () => {
      userPayload = createUserPayload({ status: "inactive" });

      response = await podClient.user.create(userPayload);
    });

    test("response to be defined with valid data", () => {
      expect(response).toHaveProperty("data");
    });

    test("response to be defined with valid data email", () => {
      expect(response).toHaveProperty("data.email", userPayload.email);
    });

    test("response to be defined with valid data username", () => {
      expect(response).toHaveProperty("data.username", userPayload.username);
    });

    test("response to be defined with valid data status", () => {
      expect(response).toHaveProperty("data.status", userPayload.status);
    });

    test("response to be defined with valid data permissions", () => {
      expect(response).toHaveProperty(
        "data.permissions",
        userPayload.permissions,
      );
    });

    test("response status code to be 200 and statusText to be OK", () => {
      return expect(response).toHaveProperty("status", 200);
    });
    test("response statusText to be OK", () => {
      return expect(response).toHaveProperty("statusText", "OK");
    });
  });

  describe("Create user method with duplicate user", () => {
    beforeAll(async () => {
      userPayload = createUserPayload({ status: "inactive" });

      await podClient.user.create(userPayload);
      response = await podClient.user.create(userPayload);
    });

    test("response to be defined with valid data", () => {
      expect(response).toHaveProperty("data", {
        code: "BadRequest",
        message: "Duplicate entry",
      });
    });

    test("response status code to be 400", () => {
      return expect(response).toHaveProperty("status", 400);
    });
    test("response statusText to be Bad Request", () => {
      return expect(response).toHaveProperty("statusText", "Bad Request");
    });
  });

  describe("Create user method with wrong account id", () => {
    beforeAll(async () => {
      userPayload = createUserPayload({ accountId: faker.internet.password() });

      response = await podClient.user.create(userPayload);
    });

    test("response to be defined with valid data", () => {
      expect(response).toHaveProperty("data", {
        code: "NotFound",
        message: "Account not found",
      });
    });

    test("response status code to be 404", () => {
      return expect(response).toHaveProperty("status", 404);
    });

    test("response statusText to be Not Found", () => {
      return expect(response).toHaveProperty("statusText", "Not Found");
    });
  });

  describe("Create user method with wrong permission account id", () => {
    beforeAll(async () => {
      userPayload = createUserPayload({
        permissions: [
          { accountId: faker.internet.password(), roles: ["role1"] },
        ],
      });

      response = await podClient.user.create(userPayload);
    });

    test("response to be defined with valid data", () => {
      expect(response).toHaveProperty("data", {
        code: "NotAuthorized",
        message: "Not Allowed",
      });
    });

    test("response status code to be 403", () => {
      return expect(response).toHaveProperty("status", 403);
    });

    test("response statusText to be Forbidden", () => {
      return expect(response).toHaveProperty("statusText", "Forbidden");
    });
  });
});
