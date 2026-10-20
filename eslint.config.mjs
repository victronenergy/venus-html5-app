import js from "@eslint/js"
import tseslint from "typescript-eslint"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import prettierPluginRecommended from "eslint-plugin-prettier/recommended"
import vitestPlugin from "@vitest/eslint-plugin"
import globals from "globals"
import confusingBrowserGlobals from "confusing-browser-globals"

export default [
  { ignores: ["dist/", "coverage/", "dev-dist/", ".vitest/", "cypress/{results,report,screenshots,videos}/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPluginRecommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,mts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
      "no-restricted-globals": ["error"].concat(confusingBrowserGlobals),
      // pre-existing in the code base, not enforced yet
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...reactPlugin.configs.recommended.globals,
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
  {
    // CommonJS config files and node scripts
    files: ["*.config.js", ".ncurc.js", "src/app/locales/poeditor/*.js", "cypress/support/**"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    // evaluated inside very old browsers, must stay ES5
    files: ["tests/legacy/probe.js"],
    rules: {
      "no-var": "off",
      "prefer-const": "off",
    },
  },
  {
    // vitest unit tests, see vitest.config.mts
    files: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}", "src/setupTests.ts"],
    plugins: { vitest: vitestPlugin },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
  {
    // cypress e2e tests, see cypress.config.ts
    files: ["cypress/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
      },
    },
  },
]
