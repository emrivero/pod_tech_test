import { PasswordVO } from "../../../../src/domain/vo/password.vo";

describe("PasswordVO", () => {
  test("should create a PasswordVO instance with a non-empty string value", () => {
    const value = "hello";
    expect(new PasswordVO(value).value).toBe(value);
  });

  test("should throw an error when creating a PasswordVO instance with an empty string value", () => {
    const value = "";
    expect(() => new PasswordVO(value)).toThrow("Password must not be empty");
  });
});
