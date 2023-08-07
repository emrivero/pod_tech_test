import { faker } from "@faker-js/faker";
import { createInstance } from "../src/application/create-instance";
import { ACCOUNT_ID } from "../test/spec/credentials";
const username = process.env.POD_USERNAME || "emilio.martinez";
const password = process.env.POD_PASSWORD || "zenitram.oilime";

const instance = createInstance({
  username,
  password,
  host: "https://hummingbird-staging.podgroup.com",
});

instance.auth
  .login()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

instance.user
  .create({
    accountId: ACCOUNT_ID,
    email: faker.internet.email(),
    permissions: [{ accountId: ACCOUNT_ID, roles: ["rol1", "rol2"] }],
    username: faker.internet.userName(),
    password: faker.internet.password(),
    status: "active",
  })
  .then((res) => {
    console.log(res);
  });

console.time("getAll");
instance.asset.getAll(ACCOUNT_ID).then((res) => {
  console.log(res.data.count);
  console.timeEnd("getAll"); // 2-3s
});
