import { createInstace } from "../../src/index";

describe("createInstance method", () => {
  it("should return an object", () => {
    const instance = createInstace();
    expect(typeof instance).toBe("object");
  });
});
