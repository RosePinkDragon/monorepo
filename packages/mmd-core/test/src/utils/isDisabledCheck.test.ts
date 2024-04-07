import isDisabledCheck from "../../../src/utils/isDisabledCheck";

describe("isDisabledCheck", () => {
  it("should return true if isDisabledField is true", () => {
    const result = isDisabledCheck({ isDisabledField: true });
    expect(result).toBe(true);
  });

  it("should return true if isDependentOn is provided but dependentFieldValue is falsy", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      dependentFieldValue: undefined,
      isDependentOn: "dependentField",
    });
    expect(result).toBe(true);
  });

  it("should return false if isDependentOn is provided and dependentFieldValue is truthy", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      dependentFieldValue: "truthyValue",
      isDependentOn: "dependentField",
    });
    expect(result).toBe(false);
  });

  it("should return true if dependentFieldValue is an array and none of the values are in dependentOnValues", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      dependentFieldValue: ["value1", "value2"],
      isDependentOn: "dependentField",
      dependentOnValues: ["value3", "value4"],
    });
    expect(result).toBe(true);
  });

  it("should return true if dependentFieldValue is an array and field is not dependent on anything", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      isDependentOn: "dependentField",
      // dependentOnValues: ["value3", "value4"],
      dependentFieldValue: ["value1", "value2"],
    });
    expect(result).toBe(false);
  });

  it("should return false if dependentFieldValue is an array and field is not dependent on anything", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      isDependentOn: "dependentField",
      // dependentOnValues: ["value3", "value4"],
      dependentFieldValue: [],
    });
    expect(result).toBe(true);
  });

  it("should return true if dependentFieldValue is not in dependentOnValues", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      dependentFieldValue: "value1",
      isDependentOn: "dependentField",
      dependentOnValues: ["value2", "value3"],
    });
    expect(result).toBe(true);
  });

  it("should return false if none of the conditions are met", () => {
    const result = isDisabledCheck({
      isDisabledField: false,
      dependentFieldValue: "value1",
      isDependentOn: "dependentField",
      dependentOnValues: ["value1", "value2"],
    });
    expect(result).toBe(false);
  });
});
