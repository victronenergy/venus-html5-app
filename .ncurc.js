module.exports = {
  reject: [
    // v8+ requires ES2018+, our target is Chrome 51 (ES2015)
    "@sentry/react",
    // deprecated in v8+, merged into @sentry/react
    "@sentry/tracing",
    // pinned to React 18, upgrade together with React 19 migration
    "react",
    "react-dom",
    "@types/react",
    "@types/react-dom",
    "react-test-renderer",
    // v4 is a full rewrite (Rust engine, no config file), requires dedicated migration
    "tailwindcss",
    // v7 requires webpack-dev-server 5, which needs config migration + react-dev-utils removal
    "webpack-cli",
    // v5 renames https→server, replaces onBefore/AfterSetupMiddleware with setupMiddlewares
    "webpack-dev-server",
    // v10 blocked by eslint-plugin-import, eslint-plugin-react, eslint-plugin-jsx-a11y (no v10 support yet)
    "eslint",
  ],
}
