module.exports = {
  extends: ["eslint:recommended", "react-app", "react-app/jest", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  root: true,
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "warn",
      {
        printWidth: 120,
        semi: false,
        singleQuote: false,
      },
    ],
  },
}
