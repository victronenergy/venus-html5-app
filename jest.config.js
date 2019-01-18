module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["./cypress"],
  setupTestFrameworkScriptFile: "<rootDir>test/setupTests.js",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/test/styleMock.js"
  }
}
