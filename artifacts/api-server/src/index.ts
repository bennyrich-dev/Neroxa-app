import app from "./app";
import { logger } from "./lib/logger";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.listen(port, "0.0.0.0", () => {
  logger.info({ port }, "API server started");
});
