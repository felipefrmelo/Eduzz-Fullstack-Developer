import pg from "pg";
import { PostgresURLRepository } from "./repository";
import { newClient } from "./db";
import { makeURLData } from "../domain/entity";

describe("PostgresURLRepository", () => {
  let client: pg.Client;
  let postgresURLRepository: PostgresURLRepository;

  beforeAll(async () => {
    client = await newClient();
  });

  afterAll(async () => {
    await client.end();
  });

  beforeEach(async () => {
    postgresURLRepository = new PostgresURLRepository(client);
  });

  afterEach(async () => {
    await client.query("DELETE FROM urls");
  });

  it("should be able to create a new url", async () => {
    const urlData = makeURLData("http://www.google.com", "googlehash");

    await postgresURLRepository.save(urlData);

    expect(await postgresURLRepository.findByHash("googlehash")).toEqual(
      urlData
    );
  });

  it("should be able to create a two urls", async () => {
    const urlData = makeURLData("http://www.google.com", "googlehash");
    const urlData2 = makeURLData("http://www.facebook.com", "facebookhash");

    await postgresURLRepository.save(urlData);
    await postgresURLRepository.save(urlData2);

    expect(await postgresURLRepository.findByHash("googlehash")).toEqual(
      urlData
    );
    expect(await postgresURLRepository.findByHash("facebookhash")).toEqual(
      urlData2
    );
  });

  it("should be able to find a url by origin url", async () => {
    const urlData = makeURLData("http://www.google.com", "googlehash");

    await postgresURLRepository.save(urlData);

    expect(
      await postgresURLRepository.findByURL("http://www.google.com")
    ).toEqual(urlData);
  });

  it("should return falsy when url is not found", async () => {
    const urlData = makeURLData("http://www.google.com", "googlehash");

    await postgresURLRepository.save(urlData);

    expect(
      await postgresURLRepository.findByURL("http://www.facebook.com")
    ).toBeFalsy();
  });
});
