module.exports = {
  root: true,
  extends: ["@mmd/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["next.config.js"],
};
