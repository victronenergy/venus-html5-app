module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended", "plugin:storybook/recommended"],
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
