import { addData } from "../src/server/server"

// describe takes two arguments...
// 1. a string description of the test
// 2. callback function for wrapping the actual test
describe("Testing the addData functionality", () => {
  // test takes two arguments as well...
  // 1. a string description
  // 2. actual test as a callback function
  test("Testing the addData() function", () => {
    // actual test
    expect(addData).toBeDefined();
  });
});
