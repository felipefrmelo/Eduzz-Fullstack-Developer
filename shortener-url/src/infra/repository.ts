import pg from "pg";
import { nanoid } from "nanoid";
import { makeURLData, URLData } from "../domain/entity";
import { URLRepository, GeneratorHash } from "../domain/shortener-service";

export class PostgresURLRepository implements URLRepository {
  constructor(private client: pg.Client) {}

  async save(url: URLData): Promise<void> {
    await this.client.query(
      "INSERT INTO urls (origin_url, hash) VALUES ($1, $2)",
      [url.originURL, url.hash]
    );
  }

  async findByHash(hash: string): Promise<URLData | null> {
    return this.client
      .query("SELECT * FROM urls WHERE hash = $1", [hash])
      .then((result) => result.rows[0])
      .then(this.extractURL);
  }

  async findByURL(originURL: string): Promise<URLData | null> {
    return this.client
      .query("SELECT * FROM urls WHERE origin_url = $1", [originURL])
      .then((result) => result.rows[0])
      .then(this.extractURL);
  }

  private extractURL(row: any): URLData | null {
    return row ? makeURLData(row.origin_url, row.hash) : null;
  }
}

export class HashGenerator implements GeneratorHash {
  execute(): string {
    return nanoid(10);
  }
}
