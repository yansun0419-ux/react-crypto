import React, { useState } from "react";
import { encrypt, decrypt } from "./utils/crypto";
import "./App.css";

function App() {
  const [plain, setPlain] = useState("");
  const [cipher, setCipher] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const handleEncrypt = () => setCipher(encrypt(plain));
  const handleDecrypt = () => setDecrypted(decrypt(cipher));

  return (
    <div className="App" style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>React 前端加密 / 解密</h1>

      <h2>1. 输入明文并加密</h2>
      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={plain}
        onChange={(e) => setPlain(e.target.value)}
        placeholder="输入要加密的内容"
      />
      <button onClick={handleEncrypt}>加密</button>
      {cipher && (
        <>
          <h3>密文（可复制给对方）</h3>
          <textarea
            rows={4}
            style={{ width: "100%" }}
            readOnly
            value={cipher}
          />
        </>
      )}

      <h2>2. 粘贴密文并解密</h2>
      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={cipher}
        onChange={(e) => setCipher(e.target.value)}
        placeholder="粘贴收到的密文"
      />
      <button onClick={handleDecrypt}>解密</button>
      {decrypted && (
        <>
          <h3>解密后的原文</h3>
          <p>{decrypted}</p>
        </>
      )}
    </div>
  );
}

export default App;
