import auth0 from "auth0-js";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import { getCookieFromReq } from "../helpers/utils";

const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "m3l6h.auth0.com",
      clientID: CLIENT_ID,
      redirectUri: `${ process.env.BASE_URL }/callback`,
      responseType: "token id_token",
      scope: "openid profile"
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.error(err);
        }
      });
    })
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    Cookies.set("jwt", authResult.idToken);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    Cookies.remove("jwt");

    this.auth0.logout({
      returnTo: "",
      clientID: CLIENT_ID
    });
  }

  async getJWKS() {
    const res = await axios.get("https://m3l6h.auth0.com/.well-known/jwks.json");
    return res.data;
  }

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) return undefined;

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // Build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${ cert }\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
        } catch (err) {
          console.error(err);
          return undefined;
        }
      }
    }

    return undefined;
  }

  async clientAuth() {
    const token = Cookies.getJSON("jwt");
    return await this.verifyToken(token);
  }

  async serverAuth(req) {
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, "jwt");
      return await this.verifyToken(token);
    }
    return undefined;
  }

}

const auth0Client = new Auth0();

export default auth0Client;