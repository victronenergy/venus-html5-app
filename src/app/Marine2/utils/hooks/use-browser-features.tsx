import { useEffect, useState } from "react"
import { bigInt, bulkMemory, signExtensions } from "wasm-feature-detect"

export interface WebGLDiagnostics {
  contextType: "webgl2" | "webgl" | null
  renderer: string | null
  vendor: string | null
  maxTextureSize: number | null
  maxRenderbufferSize: number | null
  maxVertexAttribs: number | null
  maxVaryingVectors: number | null
  maxTextureImageUnits: number | null
  missingQtExtensions: string[]
  supportedExtensions: string[]
}

const QT_WEBGL1_EXTENSIONS = ["OES_vertex_array_object", "OES_element_index_uint"]

function collectWebGLDiagnostics(): WebGLDiagnostics {
  const canvas = document.createElement("canvas")
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null
  let contextType: "webgl2" | "webgl" | null = null

  try {
    gl = canvas.getContext("webgl2")
    if (gl) contextType = "webgl2"
  } catch {
    /* ignore */
  }

  if (!gl) {
    try {
      gl = canvas.getContext("webgl")
      if (gl) contextType = "webgl"
    } catch {
      /* ignore */
    }
  }

  if (!gl) {
    return {
      contextType: null,
      renderer: null,
      vendor: null,
      maxTextureSize: null,
      maxRenderbufferSize: null,
      maxVertexAttribs: null,
      maxVaryingVectors: null,
      maxTextureImageUnits: null,
      missingQtExtensions: [],
      supportedExtensions: [],
    }
  }

  let renderer: string | null = null
  let vendor: string | null = null
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
  if (debugInfo) {
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number | null
  const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) as number | null
  const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) as number | null
  const maxVaryingVectors = gl.getParameter(gl.MAX_VARYING_VECTORS) as number | null
  const maxTextureImageUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS) as number | null

  const supportedExtensions = gl.getSupportedExtensions() ?? []

  const missingQtExtensions =
    contextType === "webgl" ? QT_WEBGL1_EXTENSIONS.filter((ext) => !supportedExtensions.includes(ext)) : []

  const loseContext = gl.getExtension("WEBGL_lose_context")
  if (loseContext) loseContext.loseContext()

  return {
    contextType,
    renderer,
    vendor,
    maxTextureSize,
    maxRenderbufferSize,
    maxVertexAttribs,
    maxVaryingVectors,
    maxTextureImageUnits,
    missingQtExtensions,
    supportedExtensions,
  }
}

function checkJSFeature(featureName: string, testCode: string): boolean {
  try {
    eval(testCode)
    return true
  } catch {
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
    "logical OR assignment": "let x = 0; x ||= 5;",
    "logical AND assignment": "let x = 1; x &&= 5;",
    "optional chaining": "let obj = {}; obj.something?.method?.()",
    // eslint-disable-next-line prettier/prettier
    "FinalizationRegistry": "new FinalizationRegistry(() => {})",
    // eslint-disable-next-line prettier/prettier
    "TextEncoder": "new TextEncoder()",
    // eslint-disable-next-line prettier/prettier
    "TextDecoder": "new TextDecoder()",
    // eslint-disable-next-line prettier/prettier
    "ReadableStream": "new ReadableStream({})",
  }

  const results: { [x: string]: boolean } = {}
  for (const [name, code] of Object.entries(features)) {
    results[name] = checkJSFeature(name, code)
  }

  // return unsupported feature names
  return Object.keys(results).filter((key) => results[key] === false)
}

// Verify the browser can allocate the WebAssembly.Memory that venus-gui-v2.wasm requires.
// Values obtained on 2026-06-01 from the WASM binary's Memory section:
//   wasm-objdump -x venus-gui-v2.wasm | grep 'Memory\[' -A2
//   Memory[1]:
//    - memory[0] pages: initial=800 max=65536
// That is 800 × 64 KB = 50 MB initial, 65536 × 64 KB = 4 GB maximum.
function checkWasmMemory() {
  try {
    new WebAssembly.Memory({ initial: 800, maximum: 65536 })
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  }
}

export const useBrowserFeatures = () => {
  const [browserFeatures, setBrowserFeatures] = useState<{
    isInitialized: boolean
    isGuiV2Supported: boolean
    missingFeatures: string[]
    webglDiagnostics: WebGLDiagnostics | null
  }>({
    isInitialized: false,
    isGuiV2Supported: false,
    missingFeatures: [],
    webglDiagnostics: null,
  })

  useEffect(() => {
    const webglDiag = collectWebGLDiagnostics()

    const checks = {
      "WASM BigInt (i64)": bigInt(),
      "WASM Bulk Memory": bulkMemory(),
      "WASM Sign Extensions": signExtensions(),
      "WASM Memory (50MB)": checkWasmMemory(),
      // eslint-disable-next-line prettier/prettier
      "WebGL": Promise.resolve(webglDiag.contextType !== null),
    }

    Promise.all(
      Object.entries(checks).map(([name, promise]) =>
        promise.then(
          (result) => ({ name, result }),
          () => ({ name, result: false }),
        ),
      ),
    ).then((results) => {
      const unsupported = results.filter((r) => !r.result).map((r) => r.name)
      unsupported.push(...checkJSFeatures())
      setBrowserFeatures({
        isInitialized: true,
        isGuiV2Supported: unsupported.length === 0,
        missingFeatures: unsupported,
        webglDiagnostics: webglDiag,
      })
    })
  }, [])

  return browserFeatures
}
