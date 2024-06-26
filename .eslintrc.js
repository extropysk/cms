module.exports = {
  root: true,
  extends: ["@payloadcms"],
  ignorePatterns: ["**/payload-types.ts", "**/migrations/**"],
  plugins: ["prettier"],
  rules: {
    "simple-import-sort/imports": "off",
    "function-paren-newline": ["off", "multiline"],
    "@typescript-eslint/no-explicit-any": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
