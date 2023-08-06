import { NotEmptyStringVO } from "../../../../../src/domain/common/vo/not-empty-string.vo";

describe("NotEmptyStringVO", () => {
  test("should create a NotEmptyStringVO instance with a non-empty string value", () => {
    const value = "hello";
    expect(new NotEmptyStringVO(value, "String").value).toBe(value);
  });

  test("should throw an error when creating a NotEmptyStringVO instance with an empty string value", () => {
    const value = "";
    const name = "String";
    expect(() => new NotEmptyStringVO(value, name)).toThrow(
      `${name} must not be empty`,
    );
  });
});
