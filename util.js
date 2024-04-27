import crypto from "crypto";

// Function to encrypt with public key and decrypt with private key
export const encryptWithPublicKey = (publicKey, message) => {
  return crypto
    .publicEncrypt(publicKey, Buffer.from(message, "utf8"))
    .toString("base64");
};

export const decryptWithPrivateKey = (privateKey, encryptedMessage) => {
  try {
    return crypto
      .privateDecrypt(privateKey, Buffer.from(encryptedMessage, "base64"))
      .toString("utf8");
  } catch (error) {
    return false;
  }
};

// Function to encrypt with private key and decrypt with public key
export const encryptWithPrivateKey = (privateKey, message) => {
  return crypto
    .privateEncrypt(privateKey, Buffer.from(message, "utf8"))
    .toString("base64");
};

export const decryptWithPublicKey = (publicKey, encryptedMessage) => {
  try {
    return crypto
      .publicDecrypt(publicKey, Buffer.from(encryptedMessage, "base64"))
      .toString("utf8");
  } catch (error) {
    return false;
  }
};

// Signature creation
export const signMessage = (privateKey, message) => {
  const sign = crypto.createSign("SHA256");
  sign.update(message);
  return sign.sign(privateKey, "base64");
};

// Receiver verifies the digital signature using sender's public key
export const verifySignature = (publicKey, message, signature) => {
  const verify = crypto.createVerify("SHA256");
  verify.update(message);
  return verify.verify(publicKey, signature, "base64");
};
