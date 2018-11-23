import { types } from 'mobx-state-tree'
import User from './models/user'

const AuthStore = types
  .model("AuthStore", {
    user: types.maybeNull(User)
  })
  .views(self => {
    return {

    };
  })
  .actions(self => {
    return {

    };
  })

export default AuthStore;