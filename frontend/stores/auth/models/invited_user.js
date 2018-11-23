import { types, getRoot } from 'mobx-state-tree';

const InvitedUser = types
  .model("User", {
    email: types.maybeNull(types.string),
    status: types.maybeNull(types.string),
    date: types.Date,
  })
  .views(self => ({
    get fullStatus () {
      const locales = getRoot(self).locales;
      return locales.t(`referals.statuses.${self.status}`);
    },
    get fullDate () {
      return (new Date(self.date * 1000)).toDateString();
    }
  }))
  .actions(self => ({

  }))

export default InvitedUser
