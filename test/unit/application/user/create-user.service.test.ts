import { faker } from "@faker-js/faker";
import { CreateUserService } from "../../../../src/application/user/create-user.service";
import { HttpClient } from "../../../../src/domain/common/interface/http.client";
import { LoginRequest } from "../../../../src/domain/login/request/login.request";
import { LoginPayload } from "../../../../src/domain/login/types/login-payload";
import { CreateUserRequest } from "../../../../src/domain/user/request/create-user.request";
import { CreateUserPayload } from "../../../../src/domain/user/types/create-user-payload";

describe("CreateUserService", () => {
  let mockHttpClient: HttpClient;
  let loginPayload: LoginPayload;
  let loginRequest: LoginRequest;
  let createUserPayload: CreateUserPayload;
  let createUserRequest: CreateUserRequest;

  beforeEach(() => {
    mockHttpClient = {
      createUser: jest.fn().mockResolvedValue({ data: "user created" }),
      login: jest.fn(),
      paginateAssets: jest.fn(),
    };

    loginPayload = {
      host: faker.internet.url({
        protocol: "https",
      }),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    loginRequest = new LoginRequest(loginPayload);

    createUserPayload = {
      accountId: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: "active",
      username: faker.internet.userName(),
      permissions: [{ accountId: faker.string.uuid(), roles: ["roles"] }],
    };

    createUserRequest = new CreateUserRequest(createUserPayload);
  });

  test("should call httpClient.login with the correct payload", async () => {
    const createUserService = new CreateUserService(mockHttpClient);

    await createUserService.createUser(createUserPayload, loginPayload);

    expect(mockHttpClient.createUser).toHaveBeenCalledTimes(1);
    expect(mockHttpClient.createUser).toHaveBeenCalledWith(
      createUserRequest,
      loginRequest,
    );
  });

  test("should return the response from httpClient.login", async () => {
    const createUserService = new CreateUserService(mockHttpClient);

    const response = await createUserService.createUser(
      createUserPayload,
      loginPayload,
    );

    expect(response).toEqual({ data: "user created" });
  });
});
