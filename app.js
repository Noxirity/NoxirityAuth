import cluster from "cluster";
import os from "os";
import express from "express";
import { config as dotenvConfig } from "dotenv";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";
import { createRequire } from "module";
import { setupRoutes } from "./scripts/routes.js";
import { errorHandler, notFoundHandler } from "./scripts/middleware.js";
import { Issuer, custom } from "openid-client";

const require = createRequire(import.meta.url);
const config = require("./util/config.json");

dotenvConfig();
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();
  const port = process.env.PORT || 3001;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));

  MongoClient.connect(process.env.MONGO_URI)
    .then(async (client) => {
      app.locals.mongo = client;

      const issuer = await Issuer.discover(config.issuer_url);
      const issuerClient = new issuer.Client({
        client_id: process.env.ROBLOX_CLIENT_ID,
        client_secret: process.env.ROBLOX_CLIENT_SECRET,
        redirect_uris: [config.redirect_uri],
        response_types: ["code"],
        scope: "openid profile group:read",
        id_token_signed_response_alg: "ES256",
      });

      issuerClient[custom.clock_tolerance] = 180;

      app.locals.issuerClient = issuerClient;

      await setupRoutes(app);
      app.listen(port, () => {
        console.log(
          `Worker ${process.pid} started on http://localhost:${port}`
        );
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
    });
}
