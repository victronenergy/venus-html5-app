module.exports = {
  reject: [
    // Sentry 7+ compiles to ES2018, breaking our ES2015 (es-check) requirement
    "@sentry/react",
    "@sentry/tracing",

    // Tailwind 4 is a full rewrite requiring migration effort
    "tailwindcss",

    // Sass 1.80+ deprecates @import (40 warnings); migrate to @use/@forward first
    "sass",

    // react-i18nify 6.4+ uses String.matchAll (ES2019). babel-preset-react-app
    // specifies corejs:3 (major only), which babel resolves to 3.0 — where matchAll
    // is only esnext, not es/stable. The polyfill is never injected, breaking
    // Garmin/Furuno MFDs (Chrome <73). Unblock after migrating to Vite.
    "react-i18nify",
  ],
};
