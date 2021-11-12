import { config } from "../../config";
import { URLData } from "./entity";
import { InvalidUrlError, ShortenerUrlNotFoundError } from "./erros";

export interface GeneratorHash {
  execute(): string;
}

export interface URLRepository {
  findByHash(hash: string): Promise<URLData | null>;
  save(url: URLData): Promise<void>;
  findByURL(originURL: string): Promise<URLData | null>;
}

export class ShortenerService {
  baseURL = config.baseUrl;
  constructor(
    private generatorHash: GeneratorHash,
    private repository: URLRepository
  ) {}

  async shorten(originURL: string): Promise<string> {
    if (this.isInvalidURL(originURL)) throw new InvalidUrlError(originURL);

    const hasOriginURL = await this.repository.findByURL(originURL);
    if (hasOriginURL) {
      return this.makeURL(hasOriginURL.hash);
    }
    const hash = this.generatorHash.execute();
    await this.repository.save({ originURL, hash });
    return this.makeURL(hash);
  }

  async getURLByHash(hash: string): Promise<URLData> {
    const url = await this.repository.findByHash(hash);
    if (!url) {
      throw new ShortenerUrlNotFoundError(hash);
    }
    return url;
  }

  private makeURL(hash: string): string {
    return `${this.baseURL}/${hash}`.replace(/https?:\/\//, "");
  }

  private isInvalidURL(url: string) {
    return !url.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm
    );
  }
}
