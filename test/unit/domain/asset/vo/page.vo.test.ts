import { PageVO } from "../../../../../src/domain/asset/vo/page.vo";

describe("PageVO", () => {
  test("should create a PageVO instance with a non-zero number value", () => {
    const value = 20;
    expect(new PageVO(value).value).toBe(value);
  });

  test("should throw an error when creating a PageVO instance with zero number value", () => {
    const value = 0;
    expect(() => new PageVO(value)).toThrow("Page must be a greater than 0");
  });
});
