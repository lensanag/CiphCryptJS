
const {
  Cipher,
  Decipher,
} = require('./../index');

const yourSuperSecretKey = process.env.YOUR_SECRET_KEY || 'your  32  characters  length key';

const text = 'your text to cipher';

let cipherText = Cipher(text, yourSuperSecretKey);

console.log('\ncipher text:');
console.log(cipherText);

let decipherText = Decipher(cipherText, yourSuperSecretKey);

console.log('decihper text:')
console.log(decipherText);