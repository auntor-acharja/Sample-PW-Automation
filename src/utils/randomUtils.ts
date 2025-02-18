export function generateRandomString(tag?: string, length?: number): string {
    const chars:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const defaultLength:number = 4;
    const randomStr = Array.from({ length: length ?? defaultLength }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return tag ? `${tag}-${randomStr}` : randomStr;
  }
  export function generateRandomNumber(tag?: string, length?: number): string {
    const digits:string = '0123456789';
    const defaultLength:number = 4;
    const randomNum = Array.from({ length: length ?? defaultLength }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join('');
    return tag ? `${tag}-${randomNum}` : randomNum;
  }

export function generateRandomEmail(tag?: string): string {
        return `${generateRandomString(tag)}@hotmail.com`;
    }  

    export function generateRandomVersion(): string {
        // Version will be generate in 0-9 range
        const major = Math.floor(Math.random() * 10); 
        const minor = Math.floor(Math.random() * 10);
        const patch = Math.floor(Math.random() * 10);
        const version = `${major}.${minor}.${patch}`;
        return  version
      }
      