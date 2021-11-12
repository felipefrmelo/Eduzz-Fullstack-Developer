import express from "express";
import "express-async-errors";
import path from "path";
import { config } from "../../config";
import { ShortenerService } from "../domain/shortener-service";
import { newClient } from "../infra/db";
import { HashGenerator, PostgresURLRepository } from "../infra/repository";
import { errorHandler } from "./middleware";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", path.join(path.resolve(), "src/views"));
app.set("view engine", "pug");

const makeService = async () => {
  const client = await newClient();
  const repository = new PostgresURLRepository(client);
  return new ShortenerService(new HashGenerator(), repository);
};

async function init() {
  const service = await makeService();

  app.post("/shortner", async function (req, res, next) {
    const { url } = req.body;

    const shortUrl = await service.shorten(url);
    res.render("index", {
      shortUrl,
      url,
    });
  });

  app.get("/:hash", async function (req, res, next) {
    const { hash: hashParam } = req.params;

    const url = await service.getURLByHash(hashParam);
    res.redirect(url.originURL);
  });

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.use(errorHandler);
}

init();

app.listen(config.port, () => {
  console.log(`App listening at ${config.baseUrl}`);
});
