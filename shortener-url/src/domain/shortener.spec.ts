import { config } from "../../config";
import { URLData } from "./entity";
import { InvalidUrlError, ShortenerUrlNotFoundError } from "./erros";
import { ShortenerService } from "./shortener-service";

class FakeGeneratorHash {
  count: number = 1;
  public execute(): string {
    return `${this.count++}`;
  }
}

class FakeURLRepository {
  private urls: URLData[] = [];
  public async findByHash(hash: string): Promise<URLData> {
    return this.urls.filter((url) => url.hash === hash)[0];
  }

  public async save(url: URLData): Promise<void> {
    this.urls.push(url);
  }

  public async findByURL(originURL: string): Promise<URLData> {
    return this.urls.filter((url) => url.originURL === originURL)[0];
  }
}

describe("shortener", () => {
  let shortenerService: ShortenerService;
  const baseURL = config.baseUrl;
  beforeEach(() => {
    shortenerService = new ShortenerService(
      new FakeGeneratorHash(),
      new FakeURLRepository()
    );
  });

  it("should shorten a url", async () => {
    const url = "https://www.google.com";
    const shortenedUrl = await shortenerService.shorten(url);
    expect(shortenedUrl).toBe(`${baseURL}/1`);
  });

  it("should redirect to originURL when given hash", async () => {
    const url = "https://www.google.com";
    await shortenerService.shorten(url);
    const redirect = await shortenerService.getURLByHash("1");
    expect(redirect.originURL).toEqual(url);
  });

  it("should throw a error when given invalid hash", async () => {
    const url = "https://www.google.com";
    await shortenerService.shorten(url);
    expect.assertions(1);
    try {
      await shortenerService.getURLByHash("2");
    } catch (e) {
      expect(e).toEqual(new ShortenerUrlNotFoundError("2"));
    }
  });

  it("should do nothing when given a url that already exists", async () => {
    const url = "https://www.google.com";
    await shortenerService.shorten(url);
    const shortenedUrl = await shortenerService.shorten(url);

    expect(shortenedUrl).toBe(`${baseURL}/1`);
  });

  it("should shorten multiple urls", async () => {
    const url = "https://www.google.com";
    const url2 = "https://www.facebook.com";
    const shortenedUrl = await shortenerService.shorten(url);
    const shortenedUrl2 = await shortenerService.shorten(url2);
    expect(shortenedUrl).toBe(`${baseURL}/1`);
    expect(shortenedUrl2).toBe(`${baseURL}/2`);
  });

  it("should throw a error when given a empty url", async () => {
    const invalidURLS = [
      "invalid//url",
      "data:image/jpeg;base64,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",
      "httpapslapsl",
    ];

    expect.assertions(invalidURLS.length);

    invalidURLS.forEach(async (invalidURL) => {
      try {
        await shortenerService.shorten(invalidURL);
      } catch (e) {
        expect(e).toEqual(new InvalidUrlError(invalidURL));
      }
    });
  });
});
