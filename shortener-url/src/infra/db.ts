import  pg from "pg";
import { config } from "../../config";
import fs from "fs";

const client = new pg.Client(config.db);
const sql = fs.readFileSync("./sql/create_table_urls.sql").toString();

export const newClient = async () => {
  await client.connect();
  await client.query(sql);
  return client;
};
