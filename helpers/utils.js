export const getCookieFromReq = (req, cookie) => {
  const myCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${ cookie }=`));

  if (!myCookie) return undefined;

  return myCookie.split("=")[1];
};

export const shortenText = (text, maxLength = 72) => {
  if (text && text.length > maxLength)
    return `${ text.substring(0, maxLength) }...`;

  return text;
};