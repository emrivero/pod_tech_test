import { CreateUserRequest } from "../../../../../src/domain/user/request/create-user.request";
import { CreateUserPayload } from "../../../../../src/domain/user/types/create-user-payload";

describe("CreateUserRequest", () => {
  const payload: CreateUserPayload = {
    accountId: "123456",
    username: "user123",
    password: "password123",
    email: "user@example.com",
    status: "active",
    permissions: [{ accountId: "123456", roles: ["rol1"] }],
  };

  test("should create an instance of CreateUserRequest", () => {
    const createUserRequest = new CreateUserRequest(payload);
    expect(createUserRequest).toBeInstanceOf(CreateUserRequest);
  });

  test("should return correct values for accountId, username, password, email, status and permissions", () => {
    const createUserRequest = new CreateUserRequest(payload);

    expect(createUserRequest.accountId).toEqual(payload.accountId);
    expect(createUserRequest.username).toEqual(payload.username);
    expect(createUserRequest.password).toEqual(payload.password);
    expect(createUserRequest.email).toEqual(payload.email);
    expect(createUserRequest.status).toEqual(payload.status);
    expect(createUserRequest.permissions).toEqual(payload.permissions);
  });
});
