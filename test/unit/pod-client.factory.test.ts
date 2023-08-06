import { faker } from "@faker-js/faker";
import { PODClient } from "../../src/domain/pod-client";
import { PODClientOptions } from "../../src/domain/types/pod.client.options";
import { PODClientFactory } from "../../src/pod.client.factory";

describe("PODClientFactory", () => {
  it("should create an instance of AxiosPODClient with the given options", () => {
    const mockOptions: PODClientOptions = {
      password: faker.string.sample(10),
      username: faker.string.sample(10),
      host: faker.internet.url(),
    };
    const instance = PODClientFactory.create(mockOptions);

    expect(instance).toBeInstanceOf(PODClient);
  });
});
