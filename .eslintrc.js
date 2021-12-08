module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "no-shadow": 0,
    "func-names": 0,
    camelcase: 0,
    "no-new": 0,
    "new-cap": 0,
  },
};
