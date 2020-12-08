
const {
  CryptSync,
  CompareCryptSync,
} = require('./../index');

const password = 'password in plain text';

const hashedPassword = CryptSync(password);

console.log('\nhashed password:')
console.log(hashedPassword);
console.log();

const wrongPassword = 'wrong wrongPassword password'

console.log('comparison result of wrong password:')
console.log(CompareCryptSync(wrongPassword, hashedPassword));
console.log('comparison result of rigth password:')
console.log(CompareCryptSync(password, hashedPassword));
