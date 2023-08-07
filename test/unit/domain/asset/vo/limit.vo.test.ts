import { LimitVO } from "../../../../../src/domain/asset/vo/limit.vo";

describe("LimitVO", () => {
  test("should create a LimitVO instance with a non-zero number value", () => {
    const value = 20;
    expect(new LimitVO(value).value).toBe(value);
  });

  test("should throw an error when creating a LimitVO instance with zero number value", () => {
    const value = 0;
    expect(() => new LimitVO(value)).toThrow("Limit must be a greater than 0");
  });
});
