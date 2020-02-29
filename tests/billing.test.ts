import { calculateCost } from "../utils/billing";

describe("billing Unit Tests", () => {
  test("Lowest Tier", () => {
    const storage = 100;

    const cost = 20000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost);
  });

  test("Highest tier", () => {
    const storage = 101;

    const cost = 10100;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost);
  });
});
