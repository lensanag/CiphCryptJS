
const {
  CiphGenerator
} = require('./../index');

const yourSuperSecretKey = process.env.YOUR_SECRET_KEY || 'some  32  characters  length key';

const {Decipher, Cipher} = new CiphGenerator(yourSuperSecretKey, 'aes-256-cbc');

const text = 'your text to cipher';

let cipherText = Cipher(text);

console.log('\ncipher text:');
console.log(cipherText);

let decipherText = Decipher(cipherText);

console.log('decihper text:')
console.log(decipherText);