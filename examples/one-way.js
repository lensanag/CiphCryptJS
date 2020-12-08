
const {
  Crypt,
  CompareCrypt,
} = require('./../index');

const password = 'password in plain text';

Crypt(password)
  .then(result => {

    const hashedPassword = result;

    console.log('\nhashed password:')
    console.log(hashedPassword);
    console.log();

    const incoming = 'wrong incoming password'

    CompareCrypt(incoming, hashedPassword)
      .then(result => {
        console.log('comparison result of wrong password:')
        console.log(result);
      });

    CompareCrypt(password, hashedPassword)
      .then(result => {
        console.log('comparison result of rigth password:')
        console.log(result);
      });
  });
