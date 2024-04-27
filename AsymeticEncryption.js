const fs = require("fs");
const crypto = require("crypto");

// Load public and private keys from files
const publicKey = fs.readFileSync("./certs/public.pem", "utf8");
const privateKey = fs.readFileSync("./certs/private.pem", "utf8");

// Function to encrypt with public key and decrypt with private key
function encryptWithPublicKey(publicKey, message) {
  return crypto
    .publicEncrypt(publicKey, Buffer.from(message, "utf8"))
    .toString("base64");
}

function decryptWithPrivateKey(privateKey, encryptedMessage) {
  try {
    return crypto
      .privateDecrypt(privateKey, Buffer.from(encryptedMessage, "base64"))
      .toString("utf8");
  } catch (error) {
    return false;
  }
}

// Function to encrypt with private key and decrypt with public key
function encryptWithPrivateKey(privateKey, message) {
  return crypto
    .privateEncrypt(privateKey, Buffer.from(message, "utf8"))
    .toString("base64");
}

function decryptWithPublicKey(publicKey, encryptedMessage) {
  try {
    return crypto
      .publicDecrypt(publicKey, Buffer.from(encryptedMessage, "base64"))
      .toString("utf8");
  } catch (error) {
    return false;
  }
}

// Test scenario 1: Encrypt with public key, decrypt with private key

const msg1 = "secret message";
const encryptedMessage1 = encryptWithPublicKey(publicKey, msg1);
const decryptedMessage1 = decryptWithPrivateKey(privateKey, encryptedMessage1);
console.log(msg1 === decryptedMessage1); // True

// Test scenario 2: Encrypt with private key, decrypt with public key

const msg2 = "secret message";
const encryptedMessage2 = encryptWithPrivateKey(privateKey, msg2);
const decryptedMessage2 = decryptWithPublicKey(publicKey, encryptedMessage2);
console.log(msg2 === decryptedMessage2); // True

module.exports = {
  encryptWithPrivateKey,
  encryptWithPublicKey,
  decryptWithPrivateKey,
  decryptWithPublicKey,
};
