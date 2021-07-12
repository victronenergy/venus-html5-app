module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        semi: false,
      },
    ],
  },
}
