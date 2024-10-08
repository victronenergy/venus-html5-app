// babel-plugin-transform-bigint.js
module.exports = function(babel) {
  const { types: t } = babel;

  return {
    name: "babel-plugin-transform-bigint",
    visitor: {
      BigIntLiteral(path) {
        const value = path.node.value;
        // Replace BigInt literal with a call to BigInt constructor
        path.replaceWith(
          t.callExpression(
            t.identifier('BigInt'),
            [t.stringLiteral(value)]
          )
        );
      }
    }
  };
};
