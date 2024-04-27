import fs from "fs";
import {
  encryptWithPublicKey,
  decryptWithPrivateKey,
  signMessage,
  verifySignature,
} from "./util.js";

const message = "This is a secret Message";

// Load public and private keys from files
const publicKey_Jim = fs.readFileSync("./certs/Jim/public_jim.pem", "utf8");
const privateKey_Jim = fs.readFileSync("./certs/Jim/private_jim.pem", "utf8");

const publicKey_Pam = fs.readFileSync("./certs/Pam/public_pam.pem", "utf8");
const privateKey_Pam = fs.readFileSync("./certs/Pam/private_pam.pem", "utf8");

const publicKey_Fake = fs.readFileSync("./certs/Fake/public_fake.pem", "utf8");
const privateKey_Fake = fs.readFileSync(
  "./certs/Fake/private_fake.pem",
  "utf8"
);

// Scenario 1 -> Jim sending a message
console.log("---------------> Jim Sending a message normal way");
// Encrypt a message With Pam Public key
let jimsEncryptedMessage = encryptWithPublicKey(publicKey_Pam, message);

// Pam Decrypts the message using her private key
let pamsDecryptedMessage = decryptWithPrivateKey(
  privateKey_Pam,
  jimsEncryptedMessage
);
console.log(
  `Jim Sending a message encrypted with Pams public key -> is signature verified :  ${
    message === pamsDecryptedMessage
  }`
);

// Scenario 2 -> Jim sending a message with a Hashed message signed with private key
console.log(
  "---------------> Jim sending a message with a Hashed message signed with Jim's private key"
);
jimsEncryptedMessage = encryptWithPublicKey(publicKey_Pam, message);
let jimsSignature = signMessage(privateKey_Jim, message);

// To verify -> Pam will
// 1. Decrypt the message
// 2. Compare the Hash and then verify signature byusing the decrypted message

pamsDecryptedMessage = decryptWithPrivateKey(
  privateKey_Pam,
  jimsEncryptedMessage
);

let isSignatureValid = verifySignature(
  publicKey_Jim,
  pamsDecryptedMessage,
  jimsSignature
);
console.log(
  `Jim Sending a message encrypted with Pams public key and a hash signed with his private key -> is signature verified :  ${isSignatureValid}`
);

// Scenario 3 -> Fake Jim sending a message with a Hashed message signed with private key
console.log(
  "---------------> Fake Jim sending a message with a Hashed message signed with fake private key"
);
let fakeMessage = "Fake Message";
let fakeJimsEncryptedMessage = encryptWithPublicKey(publicKey_Pam, fakeMessage);
let fakeJimsSignature = signMessage(privateKey_Fake, fakeMessage);

pamsDecryptedMessage = decryptWithPrivateKey(
  privateKey_Pam,
  fakeJimsEncryptedMessage
);
isSignatureValid = verifySignature(
  publicKey_Jim,
  pamsDecryptedMessage,
  fakeJimsSignature
);

console.log(
  `Fake Jim Sending a message encrypted with Pams public key and a hash signed with fake private key -> is signature verified :  ${isSignatureValid}`
);
