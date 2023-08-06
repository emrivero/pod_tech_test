import { faker } from "@faker-js/faker";
import { EmailVO } from "../../../../../src/domain/user/vo/email.vo";

describe("EmailVO", () => {
  test("should create a EmailVO instance with a valid email value", () => {
    const value = faker.internet.email();
    expect(new EmailVO(value).value).toBe(value);
  });

  test("should throw an error when creating a EmailVO instance with an invalid email value", () => {
    const value = faker.string.sample(10);
    expect(() => new EmailVO(value)).toThrow("Email must be a valid email");
  });
});
