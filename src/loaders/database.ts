import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config";
import { Models } from "../entity";

export const DatabaseSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [...Models],
  migrations: [],
  subscribers: [],
});
