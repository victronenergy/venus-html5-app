const path = require("path")

const toPascalCase = (str) => str.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase())

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename))

    if (filename.match(/\.svg$/)) {
      const componentName = `Svg${toPascalCase(path.parse(filename).name)}`
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
