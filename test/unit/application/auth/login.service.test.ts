import { faker } from "@faker-js/faker";
import { LoginOptions } from "../../../../src/application/auth/login.options";
import { LoginService } from "../../../../src/application/auth/login.service";
import { HttpClient } from "../../../../src/domain/common/interface/http.client";
import { LoginRequest } from "../../../../src/domain/login/request/login.request";

describe("LoginService", () => {
  let mockHttpClient: HttpClient;
  let loginOptions: LoginOptions;
  let loginRequest: LoginRequest;

  beforeEach(() => {
    mockHttpClient = {
      createUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ data: "successful" }),
      paginateAssets: jest.fn(),
    };

    loginOptions = {
      host: faker.internet.url({
        protocol: "https",
      }),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    loginRequest = new LoginRequest(loginOptions);
  });

  test("should call httpClient.login with the correct payload", async () => {
    const loginService = new LoginService(mockHttpClient);

    await loginService.login(loginOptions);

    expect(mockHttpClient.login).toHaveBeenCalledTimes(1);
    expect(mockHttpClient.login).toHaveBeenCalledWith(loginRequest);
  });

  test("should return the response from httpClient.login", async () => {
    const loginService = new LoginService(mockHttpClient);

    const response = await loginService.login(loginOptions);

    expect(response).toEqual({ data: "successful" });
  });
});
