export const getCookieFromReq = (req, cookie) => {
  const myCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${ cookie }=`));

  if (!myCookie) return undefined;

  return myCookie.split("=")[1];
}