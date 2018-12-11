module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["./cypress"],
  setupTestFrameworkScriptFile: "<rootDir>test/setupTests.js",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "identity-obj-proxy"
  }
}
