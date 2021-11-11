export interface URLData {
  originURL: string;
  hash: string;
}

export const makeURLData = (originURL: string, hash: string): URLData => ({
  originURL,
  hash,
});
