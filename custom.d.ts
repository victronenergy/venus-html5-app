// declare module "*.svg" {
//   import React = require("react")
//   const src: React.FC<React.SVGProps<SVGSVGElement>>
//   export default src
// }

declare module "svg" {
  const content: any
  export default content
}
