import between from "./between";

test("keeps value inside given range", () => {
  expect(between(10, 20, 15)).toBe(15);
  expect(between(-10, -20, -15)).toBe(-15);
  expect(between(10, 20, 25)).toBe(15);
  expect(between(-10, -20, -25)).toBe(-15);
  expect(between(-20, 10, 15)).toBe(-15);
});
