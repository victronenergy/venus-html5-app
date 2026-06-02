const path = require("path")
const camelcase = require("camelcase")

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename))

    if (filename.match(/\.svg$/)) {
      const pascalCaseFilename = camelcase(path.parse(filename).name, {
        pascalCase: true,
      })
      const componentName = `Svg${pascalCaseFilename}`
      return {
        code: `const React = require('react');
      const ${componentName} = React.forwardRef(function ${componentName}(props, ref) {
        return React.createElement('svg', Object.assign({}, props, { ref }));
      });
      module.exports = {
        __esModule: true,
        default: ${componentName},
        ReactComponent: ${componentName},
      };`,
      }
    }

    return { code: `module.exports = ${assetFilename};` }
  },
}
