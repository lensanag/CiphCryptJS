const crypto = require('crypto');

/**
 * One way encrypt function async.
 * Inside use 'scrypt' function from 'Crypto' module;
 * with a random 'salt', generated each time it's called.
 * @param {string} plainText 
 * @returns {Promise} retrieves a string format as 'encryptText:salt'
 */
async function Crypt(plainText) {

  return new Promise((resolve, reject) => {

    const salt = crypto.randomBytes(16).toString('hex');

    crypto.scrypt(plainText, salt, 64, (err, derivedKey) => {

      if (err) reject(err);

      const key = derivedKey.toString('hex');

      resolve(`${key}:${salt}`);
    });
  });
}

/**
 * Take cipherText an compare with encrypted plainText using the same salt
 * @param {string} plainText 
 * @param {string} cipherText string format as 'encryptText:salt'
 * @returns {Promise} retrieves comparation's value
 */
async function CompareCrypt(plainText, cipherText) {

  return new Promise((resolve, reject) => {

    const [key,salt] = cipherText.split(':');

    crypto.scrypt(plainText, salt, 64, (err, derivedKey) => {

      if (err) reject(err);
      
      resolve(key == derivedKey.toString('hex'));
    });
  });
}

module.exports = {
  Crypt,
  CompareCrypt,
}