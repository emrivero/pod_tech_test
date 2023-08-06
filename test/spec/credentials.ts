import { faker } from "@faker-js/faker";

export const CREDENTIALS = {
  username: "emilio.martinez",
  password: "zenitram.oilime",
};

export const FAKE_CREDENTIALS = {
  username: faker.string.sample(10),
  password: faker.string.sample(20),
};

export const URL = "https://hummingbird-staging.podgroup.com";
export const FAKE_URL = faker.internet.url();
