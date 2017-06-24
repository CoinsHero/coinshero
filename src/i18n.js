import T from 'i18n-react';
import localStorageSettings from './helpers/localStorageSettings';

// Why not use dynamic loading?
// We cannot use dynamic loading in a dynamic require statement. Which means we cannot decide what file to load dynamically at
// runtime. This will have to be something to improve on server side rendering if we'll choose to do so.
import * as englishUSTexts from './locale/en.yml';
import * as gbSVG from 'flag-svg-collection/flags/4x3/gb.svg';
import * as hebrewTexts from './locale/he.yml';
import * as ilSVG from 'flag-svg-collection/flags/4x3/il.svg';
import * as globalTexts from './locale/global.yml';

let currentLang;
export const DEFAULT_LANGUAGE = {
  code: 'en',
  translationKey: 'LANGUAGE_ENGLISH',
  icon: gbSVG
};

export const languages = {
  [DEFAULT_LANGUAGE.code]: DEFAULT_LANGUAGE,
  'he': {
    code: 'he',
    isRTL: true,
    translationKey: 'LANGUAGE_HEBREW',
    icon: ilSVG
  }
};

const languagesTexts = {
  [languages.en.code]: englishUSTexts,
  [languages.he.code]: hebrewTexts
};

/**
 * @param {string} localeCode - Language code
 */
export const setLanguage = (localeCode) => {
  if (!currentLang || currentLang.code !== localeCode) {
    if (!(localeCode in languages)) {
      localeCode = DEFAULT_LANGUAGE.code;
    }

    currentLang = languages[localeCode];
    T.setTexts(Object.assign({}, globalTexts, languagesTexts[DEFAULT_LANGUAGE.code], languagesTexts[currentLang.code]));

    localStorageSettings.setItem(localStorageSettings.KEYS.localeCode, localeCode);
  }

  return currentLang;
};
