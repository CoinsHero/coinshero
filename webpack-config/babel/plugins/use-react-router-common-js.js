module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source;
        source.value = source.value.replace(/^react-router\/es($|\/)/, 'react-router\/lib$1'); // eslint-disable-line no-useless-escape
      }
    }
  };
};
