const jestTimeoutBetweenSuites = 2000;
jest.retryTimes(3);
/**
 * This is for spec test where we need to wait for the previous test to finish
 * to avoid Bad Gateway error because the multirequest is too fast.
 */
beforeAll(() => {
  return new Promise((resolve) => {
    setTimeout(resolve, jestTimeoutBetweenSuites);
  });
});
