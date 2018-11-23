import 'whatwg-fetch'

const req = (url, options = {}, crsf = true) => {
  if (!window.crsftoken) {
    window.crsftoken = document.querySelector('meta[name=csrf-token]').content;
  }
  let defaultHeaders = crsf ? {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': window.crsftoken
  } : {};
  if (typeof options.body === 'string') {
    defaultHeaders = {
      ...defaultHeaders,
      'Accept': '*/*',
      'Content-Type': 'application/json',
    }
  }
  options.headers = {
    ...defaultHeaders,
    ...options.headers
  }
  options.credentials = 'same-origin';
  return fetch(url, options).then(parseStatus).then(parseJson).catch(parseJson);
}

class CustomError {
  constructor (errorResponse) {
    this.errors = {
      [errorResponse.type]: errorResponse.statusText
    }
  }
}

const parseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

const parseJson = (response) => {
  return new Promise((resolve, reject) => {
    response.json().then(res => {
      if (response.status < 300) {
        resolve(res);
      } else {
        reject(res);
      }
    })
    .catch(e => {
      reject(new CustomError(response));
    })
  })
}


export default req;