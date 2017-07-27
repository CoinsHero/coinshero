const polyfills = [
  'pseudo-worker',
  'core-js'
];

module.exports = {
  isWatching() {
    return process.argv[1].indexOf('start.js') !== -1;
  },
  isVendor(resource) {
    return /node_modules/.test(resource) &&
      !/react-hot-loader/.test(resource);
  },
  isPolyfill(resource) {
    let regex = '';

    for (let index = 0; index < polyfills.length; index++) {
      regex += polyfills[index] + '|';
    }

    return new RegExp(regex.slice(0, -1)).test(resource);
  },
  shouldPrefetch() {
    let regex = '';

    for (let index = 0; index < polyfills.length; index++) {
      regex += polyfills[index] + '|';
    }

    // Accept only js files which does not contain core-js
    return new RegExp('^(?!.*' + regex.slice(0, -1) + '.*).+\.js'); // eslint-disable-line no-useless-escape
  },
  buildResourceHintsMetaTags(origins, publicPath) {
    // If origins is undefined we'll fail ON PURPOSE
    return origins.reduce((tags, origin) => {
      // preconnect also doing DNS prefetching, so why we're adding them both?
      // Because at the moment of writing (18-Feb-2017) IE, Edge & Safari doesn't support preconnect just yet.
      const dnPrefetch = `<link rel='dns-prefetch' href='${origin}'>\n`;

      // In case the origin is different than the website's origin we'll need to add 'crossorigin' at the end
      const preconnect = `<link rel='preconnect' href='${origin}' ${publicPath.startsWith(origin) ? '' : 'crossorigin'} >\n`;

      return tags + dnPrefetch + preconnect;
    }, '');
  },
  buildHreflangLinkTags(languages) {
    return languages.reduce((tags, language) => {
      return tags + `<link rel="alternate" href="${language.localeURL}" hreflang="${language.code}">\n`;
    }, '');
  }
};
