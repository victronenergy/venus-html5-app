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
  ],
}
