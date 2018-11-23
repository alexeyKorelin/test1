import req from './request'

const API = {
  users: {
    updateWallet (params = {}) {
      const payload = JSON.stringify(params);
      return req(`api/users/update_wallet`, { method: 'PUT', body: payload });
    },
    changeStatusToPending () {
      return req(`api/users/change_status_to_pending`, { method: 'PUT' });
    },
    getAccessToken () {
      return req(`api/sumsubstance/access_token`, { method: 'GET' });
    },
    getSmartContractAddress () {
      return req(`/api/users/smart_contract_address`, { method: 'GET' });
    },
    getMntlBalance (wallet) {
      return req(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${gon.contract_address}&address=${wallet}&tag=latest`, { method: 'GET' }, false);
    },
    getEthBalance (wallet) {
      return req(`https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest`, { method: 'GET' }, false);
    }
  }
}

export default API;