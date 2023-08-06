import { faker } from "@faker-js/faker";
import { PODClient } from "../../../src/application/pod-client";
import { PODClientFactory } from "../../../src/application/pod.client.factory";
import { PODClientOptions } from "../../../src/domain/common/types/pod.client.options";

describe("PODClientFactory", () => {
  test("should create an instance of AxiosPODClient with the given options", () => {
    const mockOptions: PODClientOptions = {
      password: faker.string.sample(10),
      username: faker.string.sample(10),
      host: faker.internet.url(),
    };
    const instance = PODClientFactory.create(mockOptions);

    expect(instance).toBeInstanceOf(PODClient);
  });
});
