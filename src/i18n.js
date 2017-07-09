import T from 'i18n-react';

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
  he: {
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
  }

  return currentLang;
};

const _localeCodeMapper = (localeCode) => {
  // In case we support the language
  if (localeCode && languages[localeCode.toLowerCase()]) {
    return localeCode.toLowerCase();
  } else if (localeCode && localeCode.match(new RegExp('en[-]?', 'i'))) {
    // Any variation of English
    return DEFAULT_LANGUAGE.code;
  }

  return undefined;
};

export const getUserDefaultLanguage = () => {
  const navigator = window.navigator;
  let index;
  let localeCode = null;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(navigator.languages)) {
    for (index = 0; index < navigator.languages.length; index++) {
      localeCode = _localeCodeMapper(navigator.languages[index]);

      if (localeCode) {
        return localeCode;
      }
    }
  } else {
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];

    // support for other well known properties in browsers
    for (index = 0; index < browserLanguagePropertyKeys.length; index++) {
      localeCode = _localeCodeMapper(navigator[browserLanguagePropertyKeys[index]]);

      if (localeCode) {
        return localeCode;
      }
    }

    // In case no language was found
    if (!localeCode) {
      return DEFAULT_LANGUAGE.code;
    }
  }
};
