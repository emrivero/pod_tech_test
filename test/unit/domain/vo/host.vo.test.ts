import { faker } from "@faker-js/faker";
import { HostVO } from "../../../../src/domain/vo/host.vo";

describe("HostVO", () => {
  test("should create a HostVO instance with a http url", () => {
    const value = faker.internet.url({
      protocol: "http",
    });
    expect(new HostVO(value).value).toBe(value);
  });

  test("should create a HostVO instance with a https url", () => {
    const value = faker.internet.url({
      protocol: "https",
    });
    expect(new HostVO(value).value).toBe(value);
  });

  test("should throw an error when creating a HostVO instance with a not valid url", () => {
    const value = faker.string.sample(10);
    expect(() => new HostVO(value)).toThrow("Host must be a valid URL");
  });
});
