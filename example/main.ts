import { createInstance } from "../src/create-instance";

const username = process.env.POD_USERNAME || "";
const password = process.env.POD_PASSWORD || "";

const instance = createInstance({
  username,
  password,
  host: "https://hummingbird-staging.podgroup.com",
});

instance
  .login()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
