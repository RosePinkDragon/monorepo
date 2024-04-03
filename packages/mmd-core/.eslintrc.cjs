module.exports = {
  root: true,
  extends: ["@mmd/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["./tsconfig.json"],
};
