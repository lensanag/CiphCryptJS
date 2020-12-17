
const crypto = require('crypto');

/**
 * Sync version of 'Crypt'
 * @param {string} plainText 
 */
function CryptSync(plainText) {

  const salt = crypto.randomBytes(16).toString('hex');

  const derivedKey = crypto.scryptSync(plainText, salt, 64);

  const key = derivedKey.toString('hex');

  return `${key}:${salt}`;
}

/**
 * Sync version of 'CompareCrypt'
 * @param {string} plainText 
 * @param {string} cipherText 
 */
function CompareCryptSync(plainText, cipherText) {

  const [key,salt] = cipherText.split(':');

  if (!key || !salt) throw new Error('[CiphCrypt] malformed hash provided; example: `encrypted:iv`');

  const derivedKey = crypto.scryptSync(plainText, salt, 64);

  return key == derivedKey.toString('hex');
}

module.exports = {
  CryptSync,
  CompareCryptSync,
}