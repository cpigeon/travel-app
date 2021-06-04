import { performAction } from "../src/client/js/app"

// describe takes two arguments...
// 1. a string description of the test
// 2. callback function for wrapping the actual test
describe("Testing the submit functionality", () => {
  // test takes two arguments as well...
  // 1. a string description
  // 2. actual test as a callback function
  test("Testing the performAction() function", () => {
    // actual test
    expect(performAction).toBeDefined();
  });
});
