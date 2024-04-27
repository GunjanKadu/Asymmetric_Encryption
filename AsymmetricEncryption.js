import fs from "fs";
import {
  encryptWithPublicKey,
  encryptWithPrivateKey,
  decryptWithPrivateKey,
  decryptWithPublicKey,
} from "./util.js";

// Load public and private keys from files
const publicKey = fs.readFileSync("./certs/public.pem", "utf8");
const privateKey = fs.readFileSync("./certs/private.pem", "utf8");

// Test scenario 1: Encrypt with public key, decrypt with private key
const msg1 = "secret message";
const encryptedMessage1 = encryptWithPublicKey(publicKey, msg1);
const decryptedMessage1 = decryptWithPrivateKey(privateKey, encryptedMessage1);
console.log(
  `Encrypt with public key, decrypt with private key -> ${
    msg1 === decryptedMessage1
  }`
); // True

// Test scenario 2: Encrypt with private key, decrypt with public key
const msg2 = "secret message";
const encryptedMessage2 = encryptWithPrivateKey(privateKey, msg2);
const decryptedMessage2 = decryptWithPublicKey(publicKey, encryptedMessage2);
console.log(
  `Encrypt with private key, decrypt with public key -> ${
    msg2 === decryptedMessage2
  }`
); // True
