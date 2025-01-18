import Cookies from 'js-cookie'

export function setToken(token) {
  let d = new Date();
  d.setTime(d.getTime() + (60 * 60 * 24));
  Cookies.set("token", token, { path: "/", expires: d }) 
};

export function getToken() {
  return Cookies.get("token");
};

export function setUser(user) {
  let d = new Date();
  d.setTime(d.getTime() + (60 * 60 * 24));
  Cookies.set("user", JSON.stringify(user), { path: "/", expires: d }) 
};

export function getUser() {
  return JSON.parse(Cookies.get("user"));
};