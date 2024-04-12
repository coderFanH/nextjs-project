import cookie from 'js-cookie';

const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

/**
 * Client-Side 通过API获取
 * Server-Side 通过ctx.req（req.headers.cookie）
 */
const getCookie = (key, req) => {
  return typeof window !== 'undefined'
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

/**
 * 保存获取到的token
 * @param key
 * @returns
 */
const setCookie = (key, value) => {
  return cookie.set(key, value, { expires: 10 });
};

/**
 * 移除当前token
 */
const removeCookie = (key) => {
  return cookie.remove(key);
};

export { getCookie, setCookie, removeCookie };
