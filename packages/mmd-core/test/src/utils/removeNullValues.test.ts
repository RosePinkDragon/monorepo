import removeNullValues from "../../../src/utils/removeNullValues";
import { describe, test, expect } from "vitest";

describe("removeNullValues", () => {
  test("removes null values from an object with some properties having null values", () => {
    const inputObj = {
      name: "John",
      age: null,
      city: "New York",
      job: null,
    };

    const expectedOutput = {
      name: "John",
      city: "New York",
    };

    expect(removeNullValues(inputObj)).toEqual(expectedOutput);
  });

  test("returns an empty object for an input object with all properties as null", () => {
    const inputObj = {
      prop1: null,
      prop2: null,
      prop3: null,
    };

    expect(removeNullValues(inputObj)).toEqual({});
  });

  test("returns the same object for an input object with no null values", () => {
    const inputObj = {
      key1: "value1",
      key2: 42,
      key3: [1, 2, 3],
    };

    expect(removeNullValues(inputObj)).toEqual(inputObj);
  });

  test("returns an empty object for an empty input object", () => {
    const inputObj = {};

    expect(removeNullValues(inputObj)).toEqual({});
  });
});
