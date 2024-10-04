const eslint = require("@eslint/js")
const babelParser = require("@babel/eslint-parser")
const reactPlugin = require("eslint-plugin-react")
const prettierPluginRecommended = require("eslint-plugin-prettier/recommended")
const jestPlugin = require("eslint-plugin-jest")
const globals = require("globals")
const confusingBrowserGlobals = require("confusing-browser-globals")

module.exports = [
  eslint.configs.recommended,
  prettierPluginRecommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...jestPlugin.configs.recommended.rules,
      "no-restricted-globals": ["error"].concat(confusingBrowserGlobals),
      "no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...jestPlugin.configs.recommended.globals,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]
