export function generateRandomString(prefix?: string, length?: number): string {
  const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const defaultLength: number = 4;
  const randomStr = Array.from({ length: length ?? defaultLength }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
  return prefix ? `${prefix}-${randomStr}` : randomStr;
}
export function generateRandomNumber(prefix?: string, length?: number): string {
  const digits: string = "0123456789";
  const defaultLength: number = 4;
  const randomNum = Array.from({ length: length ?? defaultLength }, () =>
    digits.charAt(Math.floor(Math.random() * digits.length))
  ).join("");
  return prefix ? `${prefix}-${randomNum}` : randomNum;
}

export function generateRandomEmail(prefix?: string): string {
  return `${generateRandomString(prefix)}@hotmail.com`;
}

export function generateRandomVersion(): string {
  // Version will be generate in 0-9 range
  const major = Math.floor(Math.random() * 10);
  const minor = Math.floor(Math.random() * 10);
  const patch = Math.floor(Math.random() * 10);
  const version = `${major}.${minor}.${patch}`;
  return version;
}
