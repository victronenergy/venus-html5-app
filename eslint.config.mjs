import js from "@eslint/js"

import tsParser from "@typescript-eslint/parser"
import tsEslintPlugin from "@typescript-eslint/eslint-plugin"
import tsPlugin from "typescript-eslint"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import prettierPluginRecommended from "eslint-plugin-prettier/recommended"
import globals from "globals"
import confusingBrowserGlobals from "confusing-browser-globals"

export default [
  js.configs.recommended,
  prettierPluginRecommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,mts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      typescript: tsPlugin,
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
      "no-restricted-globals": ["error"].concat(confusingBrowserGlobals),
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...reactPlugin.configs.recommended.globals,
        ...globals.vitest,
        NodeJS: "readonly",
        // build-time constants, see vite.config.mts define
        __APP_VERSION__: "readonly",
        __BUILD_DATE__: "readonly",
        __BUILD_TIME__: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]
