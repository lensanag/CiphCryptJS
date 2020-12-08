
const crypto = require('crypto');

const allowAlgorithms = ['aes-256-crt', 'aes-256-cbc', 'aes-256-ofb', 'aes-256-cfb', 'aes-256-ocb'];

const defaultAlgorithm = allowAlgorithms[0];

function CiphGenerator (_sharedCipherKey, _algorithm)  {

  this.algorithm = _algorithm || defaultAlgorithm;
  this.sharedCipherKey = _sharedCipherKey || '';

  if (!allowAlgorithms.includes(this.algorithm))
    throw new Error('algorithm not supported');

  return {
    Decipher: (cipherText, cipherKey) => Decipher.call(this, cipherText, cipherKey),
    Cipher: (cipherText, cipherKey) => Cipher.call(this, cipherText, cipherKey),
  }
}

/**
 * Decrypt function sync
 * insider make use of 'createDecipheriv' function
 * @param {string} cipherText string format 'encryptText:iv'
 * @param {string} cipherKey your super secret key
 * @returns {string} decipher text
 */
function Decipher (cipherText, cipherKey) {

  const _cipherKey = cipherKey || this.sharedCipherKey || '';

  if (!_cipherKey || !_cipherKey.length) throw Error('[ciphcrypt]: cipherKey is mandatory');

  const [encrypedHex, ivHex] = cipherText.split(':');
  
  const decipher = crypto.createDecipheriv(this.algorithm || defaultAlgorithm, _cipherKey, Buffer.from(ivHex,'hex'));
  
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypedHex,'hex')), decipher.final()]);
  
  return decrypted.toString();
}

/**
 * Two way encrypt function sync
 * inside make use of 'createCipheriv' function
 * @param {string} plainText 
 * @param {string} cipherKey your super secret key
 * @returns {string} format as 'encryptText:iv'
 */
function Cipher (plainText, cipherKey) {

  const _cipherKey = cipherKey || this.sharedCipherKey || '';

  if (!_cipherKey || !_cipherKey.length) throw Error('[ciphcrypt]: cipherKey is mandatory');

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(this.algorithm || defaultAlgorithm, _cipherKey, iv);

  const encryptedHex = Buffer.concat([cipher.update(plainText), cipher.final()]).toString('hex');

  const ivHex = iv.toString('hex');

  return `${encryptedHex}:${ivHex}`;
}

module.exports = {
  CiphGenerator,
  Cipher,
  Decipher,
}
