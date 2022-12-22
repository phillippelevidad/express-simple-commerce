export function createSlug(str: string): string {
  return str
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
