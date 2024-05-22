import { Issuer, TokenSet, custom, generators } from "openid-client";
import config from "../util/config.json" assert { type: "json" };

export default {
  path: "/",
  method: "GET",
  authRequired: false,
  run: async (req, res, mongo_client, issuerClient) => {
    console.log("Root endpoint hit");
    return res.status(200).json({ message: "ok" });
  },
};
