import { useEffect, useState } from "react"
import { bigInt } from "wasm-feature-detect"

function checkJSFeature(featureName: string, testCode: string): boolean {
  try {
    // eslint-disable-next-line no-eval
    eval(testCode)
    return true
  } catch (e) {
    return false
  }
}

function checkJSFeatures() {
  const features = {
    "async/await": "async function test() { await Promise.resolve(); }",
    "arrow functions": "(() => {})",
    // eslint-disable-next-line prettier/prettier
    "let": "let x = 1;",
    // eslint-disable-next-line prettier/prettier
    "const": "const x = 1;",
    // eslint-disable-next-line prettier/prettier
    "class": "class Test {}",
    // eslint-disable-next-line no-template-curly-in-string
    "template literals": "`test ${1}`",
    // eslint-disable-next-line prettier/prettier
    "destructuring": "const {a} = {a: 1}",
    "rest parameters": "(...args) => args",
    "spread operator": "[...[]];",
    "object shorthand": "const a=1; ({a})",
    "default parameters": "(a=1) => a",
    "Map/Set": "new Map(); new Set()",
    // eslint-disable-next-line prettier/prettier
    "Promise": "new Promise(r => r())",
    // eslint-disable-next-line prettier/prettier
    "Symbol": 'Symbol("test")',
    // eslint-disable-next-line prettier/prettier
    "BigInt": "BigInt(123)",
    "bigint literal": "123n",
    "nullish coalescing": "let x; let y = x ?? 5;",
    "nullish coalescing assignment": "let x; x ??= 5;",
    "optional chaining": "let obj = {}; obj.something?.method?.()",
  }

  const results: { [x: string]: boolean } = {}
  for (const [name, code] of Object.entries(features)) {
    results[name] = checkJSFeature(name, code)
  }

  // return unsupported feature names
  return Object.keys(results).filter((key) => results[key] === false)
}

function checkWebGLSupport() {
  let result
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    const supported = !!gl
    result = supported
  } catch (e) {
    result = false
  }
  return Promise.resolve(result)
}

export const useBrowserFeatures = () => {
  const [browserFeatures, setBrowserFeatures] = useState<{
    isInitialized: boolean
    isGuiV2Supported: boolean
    missingFeatures: string[]
  }>({
    isInitialized: false,
    isGuiV2Supported: false,
    missingFeatures: [],
  })

  useEffect(() => {
    var unsupported: string[] = []

    const checks = {
      "WASM 64bit": bigInt(),
      // eslint-disable-next-line prettier/prettier
      "WebGL": checkWebGLSupport(),
    }

    Promise.all(Object.entries(checks).map(([name, promise]) => promise.then((result) => ({ name, result })))).then(
      (results) => {
        unsupported = results.filter((r) => r.result === false).map((r) => r.name)
        unsupported = unsupported.concat(checkJSFeatures())
        setBrowserFeatures({
          isInitialized: true,
          isGuiV2Supported: unsupported.length === 0,
          missingFeatures: unsupported,
        })
      }
    )
  }, [])

  return browserFeatures
}
