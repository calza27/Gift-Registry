import Cookies from 'js-cookie'

const cookieTimeout = 1000 * 60 * 60 * 24;

export function setToken(token) {
  let d = new Date();
  d.setTime(d.getTime() + cookieTimeout);
  Cookies.set("token", token, { path: "/", expires: d }) 
};

export function getToken() {
  return Cookies.get("token");
};

export function clearToken() {
  Cookies.remove("token");
  Cookies.remove("user");
};

export function setUser(user) {
  let d = new Date();
  d.setTime(d.getTime() + cookieTimeout);
  Cookies.set("user", JSON.stringify(user), { path: "/", expires: d }) 
};

export function getUser() {
  var userCookie = Cookies.get("user");
  if (userCookie) return JSON.parse(userCookie);
  return {}
};

export function getUserId() {
  var userCookie = getUser();
  if (userCookie) return userCookie['cognito:username'];
  return null;
};

export function getUserEmail() {
  var userCookie = getUser();
  if (userCookie) return userCookie['email'];
  return {}
};