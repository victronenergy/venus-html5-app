module.exports = {
  reject: [
    // Sentry 7+ compiles to ES2018, breaking our ES2015 (es-check) requirement
    "@sentry/react",
    "@sentry/tracing",

    // Tailwind 4 is a full rewrite requiring migration effort
    "tailwindcss",
  ],
};
