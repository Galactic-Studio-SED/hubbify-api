const crypto = require("crypto");

const key = process.env.DATA_KEY_ENCRYPT || "";

const CryptoMethods = {};

CryptoMethods.encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-ecb", key, null);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

CryptoMethods.decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv("aes-256-ecb", key, null);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

module.exports = CryptoMethods;
