import { types, getRoot } from "mobx-state-tree";
import i18n from 'i18next';
import { cookie } from 'utils/utils';

const localeOptions = {
  load: ['ru-RU', 'en'],
  fallbackLng: 'ru-RU',
  ns: ['all'],
  defaultNS: 'all',
  debug: process.env.NODE_ENV !== 'production',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  },
  initImmediate: false,
};

const LocalesStore = types
  .model({
    data: types.frozen(),
    locale: types.maybeNull(types.string),
  }).extend(self => {
    let instance;

    return {
      views: {
        t (key, options = {}) {
          instance = instance || i18n.init({...localeOptions, resources: self.data, lng: self.locale})
          return self.locale && instance.t(key, options); // hack for update computed values
        }
      },
      actions: {
        changeLanguage(lang) {
          cookie.set('locale', lang);
          instance.changeLanguage(lang);
          self.locale = lang;
          const root = getRoot(self);
        }
      }
    }
  })

export default LocalesStore;