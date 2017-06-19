const config = {
  FEATURE_FLAGS: {
  },
  // Every entry that will be added here will be added as a resource hint in the index.html file
  ORIGINS: {
    COINS_MARKET: 'https://coinsmarket.com',
    COINS_API: 'https://coincap.io'
  },
  CONSTS: {
    COINS_API_INTERVAL: 7000
  }
};

/*
 This piece of code gets you the list of origins that was used by your website (assuming the current session performed
 requests to all the different origins):
 [...new Set(performance.getEntries().map((req) => new URL(req.name).origin))].map((url) => {
 `<link rel="dns-prefetch" href="${url}">`}).join('\n')

 So what needs to be done is that every now and then we'll need to update our list by doing:
 1. Go to all the pages in website
 2. Run this script
 3. Update the list for each environment
 */
config.RESOURCE_HINTS_ORIGINS = Object.values(config.ORIGINS).concat([
]);

module.exports = config;
