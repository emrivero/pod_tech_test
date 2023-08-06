import { faker } from "@faker-js/faker";
import { createInstance } from "../../src/create-instance";
import { HttpClient } from "../../src/domain/http.client";
import { PODClient } from "../../src/domain/pod-client";
import { PODClientOptions } from "../../src/domain/types/pod.client.options";
import { PODClientFactory } from "../../src/pod.client.factory";

jest.mock("../../src/pod.client.factory.ts");

describe("createInstance method", () => {
  it("should create a PODClient instance with the given options", () => {
    const mockOptions: PODClientOptions = {
      password: faker.string.sample(10),
      username: faker.string.sample(10),
      host: faker.internet.url(),
    };

    const mockHttpClient: HttpClient = {
      login: jest.fn(),
    };

    const mockPODClientInstance = new PODClient(mockOptions, mockHttpClient);

    (PODClientFactory.create as jest.Mock).mockReturnValue(
      mockPODClientInstance,
    );

    const instance = createInstance(mockOptions);

    expect(PODClientFactory.create).toHaveBeenCalledWith(mockOptions);

    expect(instance).toBe(mockPODClientInstance);
  });
});
