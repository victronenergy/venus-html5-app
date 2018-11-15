const fs = require("fs")

try {
  const [, , commitFile] = process.argv
  const [subject, ...body] = fs.readFileSync(commitFile, "utf8").split("\n")

  if (subject.length > 50) {
    console.error("The subject line of a commit message should not be more than 50 characters long.")
    process.exit(1)
  } else if (subject.endsWith(".")) {
    console.error("The subject of the commit should not end with a period ('.')")
    process.exit(1)
  } else if (body.some(line => line.length > 80)) {
    console.error("The lines in the commit body should not be over 80 characters long.")
    process.exit(1)
  } else process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
