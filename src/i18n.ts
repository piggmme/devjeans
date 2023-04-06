// src/i18n.js
import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';

import ko from './locales/ko/ko.json';
import en from './locales/en/en.json';
import ja from './locales/ja/ja.json';

addMessages('ko-KR', ko);
addMessages('en', en);
addMessages('ja', ja);

const fallbackLocale = 'ko';

init({
    fallbackLocale,
    initialLocale: localStorage.getItem('devJeansLocale') || getLocaleFromNavigator() || fallbackLocale,
});