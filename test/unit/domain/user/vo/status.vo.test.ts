import { faker } from "@faker-js/faker";
import { StatusType } from "../../../../../src/domain/user/types/create-user-payload";
import { StatusVO } from "../../../../../src/domain/user/vo/status.vo";

describe("StatusVO", () => {
  test("should create a StatusVO instance with active value", () => {
    const value = "active";
    expect(new StatusVO(value).value).toBe(value);
  });

  test("should create a StatusVO instance with inactive value", () => {
    const value = "inactive";
    expect(new StatusVO(value).value).toBe(value);
  });

  test("should throw an error when creating a StatusVO instance with an invalid status value", () => {
    const value = faker.string.sample(10) as StatusType;
    expect(() => new StatusVO(value)).toThrow(
      "Status must be a active or inactive",
    );
  });
});
