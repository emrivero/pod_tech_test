import { faker } from "@faker-js/faker";
import { CreateUserPayload } from "../../src/domain/user/types/create-user-payload";
import { ACCOUNT_ID } from "./credentials";

export const createUserPayload = (
  payload: Partial<CreateUserPayload> = {},
): CreateUserPayload => ({
  accountId: ACCOUNT_ID,
  email: faker.internet.email(),
  permissions: [{ accountId: ACCOUNT_ID, roles: ["rol1", "rol2"] }],
  username: faker.internet.userName(),
  password: faker.internet.password(),
  status: "active",
  ...payload,
});
