import { Issuer, TokenSet, custom, generators } from "openid-client";
import config from "../util/config.json" assert { type: "json" };

export default {
  path: "/login",
  method: "GET",
  authRequired: false,
  run: async (req, res, mongo_client, issuerClient) => {
    const login_id = req.query.i;
    if (!login_id) {
      return res.redirect("https://noxirity.com/");
    }

    const db = mongo_client.db("RobloxOAuth");
    const collection = db.collection("users");
    const user = await collection.findOne({ login_id });

    if (!user) {
      return res.redirect("https://noxirity.com/");
    }

    console.log(`User ${user.discord_id} is logging in`);

    const rawState = { login_id, state: generators.state() };
    const state = Buffer.from(JSON.stringify(rawState)).toString("base64");
    const nonce = generators.nonce();

    res
      .cookie("state", state, config.secure_cookie_config)
      .cookie("nonce", nonce, config.secure_cookie_config)
      .redirect(
        issuerClient.authorizationUrl({
          scope: issuerClient.scope,
          state,
          nonce,
        })
      );
  },
};
