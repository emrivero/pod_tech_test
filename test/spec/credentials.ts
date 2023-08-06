import { faker } from "@faker-js/faker";

export const CREDENTIALS = {
  username: "emilio.martinez",
  password: "zenitram.oilime",
};

export const FAKE_CREDENTIALS = {
  username: faker.string.sample(10),
  password: faker.string.sample(20),
};

export const HOST = "https://hummingbird-staging.podgroup.com";
export const FAKE_HOST = faker.internet.url();
export const ACCOUNT_ID = "5a1ca1c8-a027-5555-9d2b-3dbb5b32dab7";
