import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16 位
const IV = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16 位

export function encrypt(plain: string): string {
  const src = CryptoJS.enc.Utf8.parse(plain);
  const cfg = { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
  return CryptoJS.AES.encrypt(src, KEY, cfg).toString();
}

export function decrypt(cipher: string): string {
  const cfg = { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
  const bytes = CryptoJS.AES.decrypt(cipher, KEY, cfg);
  return bytes.toString(CryptoJS.enc.Utf8);
}
