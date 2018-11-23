import Cookies from 'universal-cookie'

export const cookie = {
  get(name) {
    const cookies = new Cookies();
    return cookies.get(name);
  },
  set(name, value, options) {
    options = options || {};
    options.expires = options.expires || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
    options.path = "/";
    const cookies = new Cookies();
    cookies.set(name, value, options);
  },
  remove(name) {
    const cookies = new Cookies();
    cookies.remove(name);
  }
}