import { UsernameVO } from "../../../../../src/domain/common/vo/username.vo";

describe("UsernameVO", () => {
  test("should create a UsernameVO instance with a non-empty string value", () => {
    const value = "hello";
    expect(new UsernameVO(value).value).toBe(value);
  });

  test("should throw an error when creating a UsernameVO instance with an empty string value", () => {
    const value = "";
    expect(() => new UsernameVO(value)).toThrow("Username must not be empty");
  });
});
