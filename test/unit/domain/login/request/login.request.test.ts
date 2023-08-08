import { faker } from "@faker-js/faker";
import { LoginRequest } from "../../../../../src/domain/login/request/login.request";
import { LoginPayload } from "../../../../../src/domain/login/types/login-payload";

describe("Login Request class", () => {
  const mockPayload: LoginPayload = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    host: faker.internet.url({
      protocol: "https",
    }),
  };

  test("should return the correct username, password and host using getters", () => {
    const loginInstance = new LoginRequest(mockPayload);

    expect(loginInstance.username).toBe(mockPayload.username);
    expect(loginInstance.password).toBe(mockPayload.password);
    expect(loginInstance.host).toBe(mockPayload.host);
  });
});
