declare module 'ciphcrypt' {
  /**
   * One way encrypt function async.
   * Inside use 'scrypt' function from 'Crypto' module;
   * with a random 'salt', generated each time it's called.
   * @param plainText 
   * @returns retrieves a string format as 'encryptText:salt'
   */
  export function Crypt(plainText: string): Promise<string>;

  /**
   * Sync version of 'Crypt'
   * @param plainText 
   */
  export function CryptSync(plainText: string): string;

  /**
   * Take cipherText an compare with encrypted plainText using the same salt
   * @param plainText 
   * @param cipherText string format as 'encryptText:salt'
   * @returns retrieves comparation's value
   */
  export function CompareCrypt(plainText: string, cipherText: string): Promise<boolean>;

  /**
   * Sync version of 'CompareCrypt'
   * @param plainText 
   * @param cipherText 
   */
  export function CompareCryptSync(plainText: string, cipherText: string): boolean;

  export class CiphGenerator {
    constructor(secretKey: string, algorithm: string);
    Cipher: typeof Cipher;
    Decipher: typeof Decipher;
  }

  /**
   * Two way encrypt function sync
   * inside make use of 'createCipheriv' function
   * @param plainText 
   * @param cipherKey your super secret key
   * @returns format as 'encryptText:iv'
   */
  export function Cipher(plainText: string, cipherKey: string): string;

  /**
   * Decrypt function sync
   * insider make use of 'createDecipheriv' function
   * @param cipherText string format 'encryptText:iv'
   * @param cipherKey your super secret key
   * @returns decipher text
   */
  export function Decipher(cipherText: string, cipherKey: string): string;
}
