const {
  encryptWithPublicKey,
  decryptWithPrivateKey,
} = require("./AsymeticEncryption");

const fs = require("fs");

const message = "This is a secret Message";

// Load public and private keys from files
const publicKey_Jim = fs.readFileSync("./certs/Jim/public_jim.pem", "utf8");
const privateKey_Jim = fs.readFileSync("./certs/Jim/private_jim.pem", "utf8");
const publicKey_Pam = fs.readFileSync("./certs/Pam/public_pam.pem", "utf8");
const privateKey_Pam = fs.readFileSync("./certs/Pam/private_pam.pem", "utf8");

// Scenario -> Jim sending a message
// Encrypt a message With Pam Public key
const jimsEncryptedMessage = encryptWithPublicKey(publicKey_Pam, message);

// Pam Decrypts the message using her private key
const decryptedPamsMessage = decryptWithPrivateKey(
  privateKey_Pam,
  jimsEncryptedMessage
);
console.log(message === decryptedPamsMessage);
