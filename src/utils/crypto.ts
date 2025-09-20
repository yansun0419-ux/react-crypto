import CryptoJS from "crypto-js";

function generateKeyAndIV(password: string) {
  const hash = CryptoJS.SHA256(password);
  const key = CryptoJS.lib.WordArray.create(hash.words.slice(0, 8));
  const iv = CryptoJS.lib.WordArray.create(hash.words.slice(8, 12));
  return { key, iv };
}

export function encrypt(plain: string, password: string): string {
  const { key, iv } = generateKeyAndIV(password);
  const src = CryptoJS.enc.Utf8.parse(plain);
  const cfg = { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
  return CryptoJS.AES.encrypt(src, key, cfg).toString();
}

export function decrypt(cipher: string, password: string): string {
  const { key, iv } = generateKeyAndIV(password);
  const cfg = { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
  const bytes = CryptoJS.AES.decrypt(cipher, key, cfg);
  return bytes.toString(CryptoJS.enc.Utf8);
}
