module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
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
