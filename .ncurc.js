module.exports = {
  reject: [
    // Sentry 7+ has a different API (BrowserTracing integration), migrate explicitly
    "@sentry/react",
    "@sentry/tracing",

    // Tailwind 4 is a full rewrite requiring migration effort
    "tailwindcss",

    // Sass 1.80+ deprecates @import (40 warnings); migrate to @use/@forward first
    "sass",

    // ESLint 10 is not supported by eslint-plugin-react 7.x (crashes at runtime), @eslint/js must match the eslint major
    "eslint",
    "@eslint/js",

    // TypeScript 7 is not supported by typescript-eslint yet (peer dependency typescript <6.1)
    "typescript",

    // mobx-react-lite 5 and mobx-react 10 require mobx 7, mobx 6 is in use
    "mobx-react-lite",
    "mobx-react",
  ],
}
