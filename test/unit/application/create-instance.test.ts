import { faker } from "@faker-js/faker";
import { AuthModule } from "../../../src/application/auth/auth.module";
import { createInstance } from "../../../src/application/create-instance";
import { PODClient } from "../../../src/application/pod-client";
import { PODClientFactory } from "../../../src/application/pod.client.factory";
import { UserModule } from "../../../src/application/user/user.module";
import { PODClientOptions } from "../../../src/domain/common/types/pod.client.options";

jest.mock("../../../src/application/pod.client.factory.ts");

describe("createInstance method", () => {
  test("should create a PODClient instance with the given options", () => {
    const mockOptions: PODClientOptions = {
      password: faker.string.sample(10),
      username: faker.string.sample(10),
      host: faker.internet.url(),
    };

    const mockAuthModule: AuthModule = {
      login: jest.fn(),
    };

    const mockUserModule: UserModule = {
      createUser: jest.fn(),
    };

    const mockPODClientInstance = new PODClient(
      mockOptions,
      mockAuthModule,
      mockUserModule,
    );

    (PODClientFactory.create as jest.Mock).mockReturnValue(
      mockPODClientInstance,
    );

    const instance = createInstance(mockOptions);

    expect(PODClientFactory.create).toHaveBeenCalledWith(mockOptions);

    expect(instance).toBe(mockPODClientInstance);
  });
});
