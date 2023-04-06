// src/i18n.js
import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';

import ko from './locales/ko/ko.json';
import en from './locales/en/en.json';
import jp from './locales/jp/jp.json';

addMessages('ko', ko);
addMessages('en', en);
addMessages('jp', jp);

const fallbackLocale = 'ko';

init({
    fallbackLocale,
    initialLocale: getLocaleFromNavigator() || fallbackLocale,
});