import { types } from 'mobx-state-tree';
import API from 'utils/api';
import InvitedUser from './invited_user';

const User = types
  .model("User", {
    email: types.maybeNull(types.string),
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    country: types.maybeNull(types.string),
    wallet: types.maybeNull(types.string),
    status: types.maybeNull(types.string),
    mntl: types.maybeNull(types.number),
    eth: types.maybeNull(types.number),
    smart_contract_address: types.maybeNull(types.string),
    ref_code: types.maybeNull(types.string),
    invited: types.array(InvitedUser)
  })
  .views(self => ({
    get fullname () {
      return `${self.first_name} ${self.last_name}`
    },
    get refLink () {
      return `https://invest.mentalmarket.io?referal=${self.ref_code}`;
    },
    get shortWallet () {
      return `${self.wallet.substr(0, 4)}....${self.wallet.slice(-4)}`;
    },
    get filled () {
      return (self.status === 'verified' || self.status === 'invested') && self.wallet && self.wallet.length > 0;
    }
  }))
  .actions(self => ({
    updateWalletSuccess (params) {
      self.wallet = params.user.wallet;
    },
    updateWallet (params) {
      return new Promise((resolve, reject) => {
        return API.users.updateWallet(params).then(res => {
          self.updateWalletSuccess(params);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    changeStatusToPendingSuccess (res) {
      self.status = res.status;
    },
    changeStatusToPending () {
      return new Promise((resolve, reject) => {
        return API.users.changeStatusToPending().then(res => {
          self.changeStatusToPendingSuccess(res);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getAccessToken () {
      return new Promise((resolve, reject) => {
        return API.users.getAccessToken().then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateMntlBalance () {
      return new Promise((resolve, reject) => {
        return API.users.getMntlBalance(self.wallet).then(res => {
          if (res.status === '1') self.saveMntl(res.result);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateEthBalance () {
      return new Promise((resolve, reject) => {
        return API.users.getEthBalance(self.wallet).then(res => {
          if (res.status === '1') self.saveEth(res.result);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateBalance () {
      self.updateEthBalance();
      self.updateMntlBalance();
    },
    saveMntl (balance) {
      self.mntl = self.formatBalance(balance);
    },
    saveEth (balance) {
      self.eth = self.formatBalance(balance);
    },
    formatBalance (balance) {
      return parseFloat((balance / 1000000000000000000).toFixed(3));
    },
    updateSmartContractAddress () {
      if (!self.smart_contract_address)
        return new Promise((resolve, reject) => {
          return API.users.getSmartContractAddress().then(res => {
            if (res.address) self.saveSmartContractAddress(res.address);
            resolve(res);
          }).catch(error => {
            reject(error);
          })
        })
    },
    saveSmartContractAddress (address) {
      self.smart_contract_address = address;
    }
  }))

export default User;
