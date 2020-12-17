# CiphCryptJS

Minimum set of functions for easy encrypt/decrypt text from node's 'crypto' module.

This set of functions should be consider a kind of shorcuts for [crypto](https://nodejs.org/api/crypto.html) with default values preset.

**NOTICE ⚠️**

Encrypt function calls twice or more with the same password **don't generate the same hash**, this is by the use of a new random salt/iv* wich is generated each time the function is called.

Salt used to encrypt is append to the string returned; thus the finall returned string has the follow structure: **_encrypted:salt_**

*Initialization Vector

## **ADVICE 💡**

- **DON'T HARDCODED YOUR SECRET KEYS**; insted, prefer use 'dot files'; [dotenv](https://www.npmjs.com/package/dotenv) is an excelent tool for simplify that task.

- **DON'T MAKE YOUR OWN ALGORITHM**; avoid security risk using confidence algorithms and invest some time reading about it. The examples provided by [crypto](https://nodejs.org/api/crypto.html) module are good entry point.

## Gettig started 🚀

Installation:

```bash
npm install -S ciphcrypt

```

Use

```javascript
const ciphcrypt = require('ciphcrypt');

const {
  Crypt,
  CryptSync,
  CompareCrypt,
  CompareCryptSync,
  CiphGenerator,
  Cipher,
  Decipher
} = ciphcrypt;
```

## Requirements 📋

- Node 12

## Tests ⚙️

_Pending..._

## Examples 😎

**One way encrypt with "Promises" (async)**
```javascript
const {
  Crypt,
  CompareCrypt,
} = require('ciphcrypt');

const password = 'password in plain text';

Crypt(password)
  .then(result => {

    const hashedPassword = result;
    console.log(result);
    // prints a string like this: 692059...63f6:b600a945...471

    const incoming = 'wrong incoming password'

    CompareCrypt(incoming, hashedPassword)
      .then(result => {
        console.log(result);
        // prints "false"
      });

    CompareCrypt(password, hashedPassword)
      .then(result => {
        console.log(result);
        // prints "true"
      });
  });
```

**One way encrypt with sync functions ⚠️**
```javascript
const {
  CryptSync,
  CompareCryptSync,
} = require('ciphcrypt');

const password = 'password in plain text';

const hashedPassword = CryptSync(password);
console.log(hashedPassword);
// prints a string like this: 692059...63f6:b600a945...471

const wrongPassword = 'wrong password'

console.log(CompareCryptSync(wrongPassword, hashedPassword));
// prints "false"
console.log(CompareCryptSync(password, hashedPassword));
// prints "true"
```
⚠️ Sync function are provided for certain edge use cases; prefer to use async versions to take advantage of the javascript's nature 😉

**Two ways encrypt**
```javascript
const {
  Cipher,
  Decipher,
} = require('ciphcrypt');

const yourSuperSecretKey = process.env.YOUR_SECRET_KEY || 'your  32  characters  length key';

const text = 'your text to cipher';

let cipherText = Cipher(text, yourSuperSecretKey);

console.log(cipherText);
// prints a string like this: 692059...63f6:b600a945...471

let decipherText = Decipher(cipherText, yourSuperSecretKey);

console.log(decipherText);
// prints 'your text to cipher'

```

**Two ways encrypt using wrapper generator***
```javascript
const {
  CiphGenerator
} = require('ciphcrypt');

const yourSuperSecretKey = process.env.YOUR_SECRET_KEY || 'some  32  characters  length key';

const {Decipher, Cipher} = new CiphGenerator(yourSuperSecretKey, 'aes-256-cbc');

const text = 'your text to cipher';

let cipherText = Cipher(text);

console.log(cipherText);
// prints a string like this: 692059...63f6:b600a945...471

let decipherText = Decipher(cipherText);

console.log(decipherText);
// prints 'your text to cipher'
```
*Using wrapper function you could configure once and export ready to use functions; this way you avoid reference your "secretkey" on various places.

## Documentation 📄
_Checkout the examples_ 😅

## TODOS 📝
Current:
- [ ] Add documentation.
- [ ] Add automated test.
- [x] Add types definitions. (Thanks [Geopic](https://github.com/geopic))
- [ ] Add more algorithms/modes*

*Currently support: 'aes-256-crt', 'aes-256-cbc', 'aes-256-ofb', 'aes-256-cfb' & 'aes-256-ocb'

Next:
- [ ] Add generation function to allow customize more settings.

## Contributing 🖇️

Please read [CONTRIBUTING.md](CONTRIBUTING.md).

## Version 📌

This project use [SemVer](http://semver.org/).

## Authors ✒️

* **Lenin Sanchez** - [lensanag](https://github.com/lensanag).

## Licence 📄

This project is under licence MIT - see file [LICENSE.md](LICENSE.md) for details.

---
Made with ❤️ by [lensanag](https://github.com/lensanag) 😊