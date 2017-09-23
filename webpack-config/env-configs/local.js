const config = {
  FEATURE_FLAGS: {
    DEBUGGABLE: false
  },
  // Every entry that will be added here will be added as a resource hint in the index.html file
  ORIGINS: {
    COINS_HERO: 'http://local-coinshero.io:3001',
    COINS_IO: 'https://coincap.io',
    CRYPTO_COMPARE: 'https://www.cryptocompare.com',
    FIXER_IO: 'https://api.fixer.io',
    CHANGELLY: 'https://changelly.com'
  },
  SERVICES: {
    COINS_IO: {
      COINS_DATA_API_INTERVAL: 1000 * 10
    },
    CRYPTO_COMPARE: {
      COINS_LIST_API_INTERVAL: 1000 * 60
    },
    FIXER_IO: {
      CURRENCIES_API_INTERVAL: 1000 * 60 * 60
    },
    CHANGELLY: {
      REF_ID: '298522b89520'
    }
  },
  DONATION: {
    LITECOIN: 'Ld9X6aaq9EkXeRRQVPaZuXet8unyu7f7kT',
    BITCOIN: '18gsEV5FaKMhJEtrQkun2SvwKCzvRwrUGD',
    ETHEREUM: '0xeae32e0b5fde43dad837b4e6133aec19eee25d0e'
  },
  GA_ANALYTICS: {
    TRACKING_ID: 'UA-102569759-1',
    DEBUG: false
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
