import T from 'i18n-react';

// Why not use dynamic loading?
// We cannot use dynamic loading in a dynamic require statement. Which means we cannot decide what file to load dynamically at
// runtime. This will have to be something to improve on server side rendering if we'll choose to do so.
import * as englishUSTexts from './locale/en.yml';
import * as hebrewTexts from './locale/he.yml';
import * as globalTexts from './locale/global.yml';

let currentLang;
export const DEFAULT_LANGUAGE = {
  code: 'en',
  translationKey: 'LANGUAGE_ENGLISH'
};

export const languages = {
  [DEFAULT_LANGUAGE.code]: DEFAULT_LANGUAGE,
  'he': {
    code: 'he',
    isRTL: true,
    translationKey: 'LANGUAGE_HEBREW'
  }
};

const languagesTexts = {
  [languages.en.code]: englishUSTexts,
  [languages.he.code]: hebrewTexts
};

/**
 * @param {string} lang - Language code
 */
export const setLanguage = (lang) => {
  if (!(lang in languages)) {
    lang = DEFAULT_LANGUAGE.code;
  }

  currentLang = languages[lang];
  T.setTexts(Object.assign({}, globalTexts, languagesTexts[DEFAULT_LANGUAGE.code], languagesTexts[currentLang.code]));

  return languages[lang];
};
