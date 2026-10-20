// Gzip every file in dist/ larger than THRESHOLD bytes that compresses to less than MIN_RATIO of its size
// and delete the original, the web server on the device serves the precompressed files (same behaviour
// and defaults as the former webpack CompressionPlugin, e.g. the already compressed 8 MB Noto font is skipped).
// Runs in postbuild after es-check so that the ES compatibility gate always sees plain .js files.
import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync } from "node:fs"
import { join } from "node:path"
import { gzipSync } from "node:zlib"

const THRESHOLD = 500000
const MIN_RATIO = 0.8
const root = process.argv[2] || "dist"

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const file = join(dir, name)
    return statSync(file).isDirectory() ? walk(file) : [file]
  })

for (const file of walk(root)) {
  if (file.endsWith(".gz")) continue
  const size = statSync(file).size
  if (size <= THRESHOLD) continue
  const gz = gzipSync(readFileSync(file), { level: 9 })
  if (gz.length / size > MIN_RATIO) continue
  writeFileSync(file + ".gz", gz)
  unlinkSync(file)
  console.log(`gzipped ${file} (${(size / 1024).toFixed(0)} kB -> ${(gz.length / 1024).toFixed(0)} kB)`)
}
