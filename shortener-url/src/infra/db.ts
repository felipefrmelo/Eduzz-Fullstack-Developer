import pg from "pg";
import { config } from "../../config";
import fs from "fs";

const { connectionString, ...db } = config.db;
const client = new pg.Client(
  connectionString
    ? {
        connectionString,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : db
);

const sql = fs.readFileSync("./sql/create_table_urls.sql").toString();

export const newClient = async () => {
  await client.connect();
  await client.query(sql);
  return client;
};
