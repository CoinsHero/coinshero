module.exports = {
  isWatching() {
    return process.argv[1].indexOf('start.js') !== -1;
  },
  isVendor(resource) {
    return /node_modules/.test(resource) &&
      !/react-hot-loader/.test(resource);
  },
  isPolyfill(resource) {
    return /core-js/.test(resource);
  },
  shouldPrefetch() {
    // Accept only js files which does not contain core-js
    return /^(?!.*core-js.*).+\.js/;
  },
  buildResourceHintsMetaTags(origins, publicPath) {
    // If origins is undefined we'll fail ON PURPOSE
    return origins.reduce((tags, origin) => {
      // preconnect also doing DNS prefetching, so why we're adding them both?
      // Because at the moment of writing (18-Feb-2017) IE, Edge & Safari doesn't support preconnect just yet.
      const dnPrefetch = `<link rel=\"dns-prefetch\" href=\"${origin}\">\n`;

      // In case the origin is different than the website's origin we'll need to add 'crossorigin' at the end
      const preconnect = `<link rel="preconnect" href="${origin}" ${publicPath.startsWith(origin) ? '' : 'crossorigin'} >\n`;

      return tags + dnPrefetch + preconnect;
    }, "");
  }
};
