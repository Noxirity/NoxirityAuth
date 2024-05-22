import { Issuer, TokenSet, custom, generators } from "openid-client";
import config from "../util/config.json" assert { type: "json" };
import { getHomeHtml } from "../util/getHomeHtml.js";

export default {
  path: "/home",
  method: "GET",
  authRequired: false,
  run: async (req, res, mongo_client, issuerClient) => {
    try {
      const tokenSet = new TokenSet(req.signedCookies.tokenSet);
      const claims = tokenSet.claims();

      res.status(200).json({
        username: `@${claims.preferred_username}`,
        id: claims.sub,
      });
    } catch (error) {
      res.status(401).json({
        error: "Unauthorized",
      });
    }
  },
};