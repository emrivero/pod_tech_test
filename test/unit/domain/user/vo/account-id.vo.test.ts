import { AccountIdVO } from "../../../../../src/domain/user/vo/account-id.vo";

describe("AccountIdVO", () => {
  test("should create a AccountIdVO instance with a non-empty string value", () => {
    const value = "account-id";
    expect(new AccountIdVO(value).value).toBe(value);
  });

  test("should throw an error when creating a AccountIdVO instance with an empty string value", () => {
    const value = "";
    expect(() => new AccountIdVO(value)).toThrow("AccountId must not be empty");
  });
});
