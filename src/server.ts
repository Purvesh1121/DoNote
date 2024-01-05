import config from "./config";
import app from "./loaders/express";
import { DatabaseSource } from "./loaders/database";
import LoggerModule from "./loaders/logger";

const Logger = LoggerModule("Server");
const port = config.port;

// start the express server
const startServer = async () => {
  try {
    const dataSouce = await DatabaseSource.initialize();
    if (!dataSouce.isInitialized) {
      throw new Error("ERROR: Database not connected");
    }
    Logger.info("DB conntected");
    app.listen(port, () => {
      Logger.info(`Server started on port: ${port}`);
    });
  } catch (error) {
    Logger.error(error);
  }
};

startServer();
