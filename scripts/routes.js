import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync, statSync } from "fs";

export async function setupRoutes(app) {
  const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
  const dir = join(__dirname, "endpoints");
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stats = statSync(filePath);

    if (stats.isFile()) {
      const endpoint = await import(filePath);
      app[endpoint.default.method.toLowerCase()](
        endpoint.default.path,
        (req, res) => {
          endpoint.default.run(
            req,
            res,
            app.locals.mongo,
            app.locals.issuerClient
          );
        }
      );
    }
  }
}
