import { faker } from "@faker-js/faker";
import { createInstance } from "../src";
import { ACCOUNT_ID } from "../test/spec/credentials";
const username = process.env.POD_USERNAME || "emilio.martinez";
const password = process.env.POD_PASSWORD || "zenitram.oilime";

const instance = createInstance({
  username,
  password,
  host: "https://hummingbird-staging.podgroup.com",
});

// Auth login method
instance.auth.login().then((res) => {
  console.log(res);
});

// User create method
instance.user.create({
  accountId: ACCOUNT_ID,
  email: faker.internet.email(),
  permissions: [{ accountId: ACCOUNT_ID, roles: ["rol1", "rol2"] }],
  username: faker.internet.userName(),
  password: faker.internet.password(),
  status: "active",
});

//getAll assets method
console.time("getAll");
instance.asset.getAll(ACCOUNT_ID).then((res) => {
  console.log(res.data);
  console.log(res.statusText);
  console.timeEnd("getAll"); // ~ 1.5s
});

// getAssetsCount method
console.time("getAssetsCount");
instance.asset
  .getAssetsCount(ACCOUNT_ID, "active,inactive,suspended")
  .then((res) => {
    console.log(res.data);
    console.log(res.statusText);
    console.timeEnd("getAssetsCount"); // ~ 1.5s
  });
