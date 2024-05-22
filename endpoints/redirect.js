import { Issuer, TokenSet, custom, generators } from "openid-client";
import config from "../util/config.json" assert { type: "json" };
import page from "../scripts/getConfirmedPage.js";

export default {
  path: "/redirect",
  method: "GET",
  authRequired: false,
  run: async (req, res, mongo_client, issuerClient) => {
    try {
      const params = issuerClient.callbackParams(req);
      const tokenSet = await issuerClient.callback(
        config.redirect_uri,
        params,
        {
          nonce: req.signedCookies.nonce,
          state: req.signedCookies.state,
        }
      );

      const decodedState = JSON.parse(
        Buffer.from(params.state, "base64").toString()
      );
      const login_id = decodedState.login_id;
      const discord_id = decodedState.discord_id;

      const db = mongo_client.db("RobloxOAuth");
      const collection = db.collection("users");
      const user = await collection.findOne({ login_id });

      if (!user) {
        return res.redirect("https://noxirity.com/");
      }

      const claims = tokenSet.claims();
      const roblox_id = claims.sub;

      await collection.updateOne(
        { login_id },
        {
          $addToSet: {
            roblox_ids: [roblox_id, claims.preferred_username, Date.now()], // roblox id, username, last username check
          },
          $unset: { login_id: 1, login_id_expires: 1 },
        }
      );

      async function reward_item() {
        const items_db = mongo_client.db("ArcadeHaven");
        const items_collection = items_db.collection("items");
        const item = await items_collection.findOne(
          { name: "Verified Sign" },
          { projection: { quantitySold: 1, serials: 1 } }
        );

        // ensure the user has not already received the reward
        if (item.serials.some((serial) => serial.u === parseInt(roblox_id))) {
          return `<p>You have already received a <strong>Verified Sign</strong> in Arcade Haven!</p>`;
        }

        const MAX_QUANTITY = 100;
        if (item.quantitySold < MAX_QUANTITY) {
          await items_collection.updateOne(
            { name: "Verified Sign" },
            {
              $inc: { quantitySold: 1 },
              $push: {
                serials: {
                  u: parseInt(roblox_id),
                  t: Math.floor(Date.now() / 1000),
                },
              },
            }
          );
          return `<p>You have received a <strong>Verified Sign</strong> in Arcade Haven as a reward for linking your Roblox account!</p>`;
        }

        return `<p>Unfortunately, the <strong>Verified Sign</strong> is out of stock!</p>`;
      }

      const reward_msg = await reward_item();

      res.clearCookie("state").clearCookie("nonce").clearCookie("token");
      // change url
      page.send(
        req,
        res,
        claims.preferred_username,
        user.discord_name,
        reward_msg
      );
    } catch (error) {
      res.redirect("https://noxirity.com/");
    }
  },
};
