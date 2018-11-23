import { types } from 'mobx-state-tree';
import AuthStore from './auth';
import User from './auth/models/user';
import LocalesStore from './locales';
import { RouterStore } from 'mobx-router';

const AppStore = types
  .model("AppStore", {
    auth: AuthStore,
    locales: LocalesStore,
    env: types.string,
  })
  .extend(self => {
    let Router = new RouterStore();

    return {
      views: {
        get router () {
          return Router;
        }
      },
      actions: {

      }
    }
  })


export const initStore = () => {
  return AppStore.create({
    auth: AuthStore.create({
      user: User.create(gon.current_user)
    }),
    locales: LocalesStore.create({
      data: gon.translations,
      locale: gon.locale
    }),
    env: process.env.NODE_ENV,
  })
}
