import React, { useState } from "react";
import { encrypt, decrypt } from "./utils/crypto";
import "./App.css";

function App() {
  const [plain, setPlain] = useState("");
  const [cipher, setCipher] = useState("");

  const handleEncrypt = () => setCipher(encrypt(plain));
  const handleDecrypt = () => setPlain(decrypt(cipher));

  return (
    <div
      className="App"
      style={{ maxWidth: 1200, margin: "40px auto", padding: "0 20px" }}
    >
      <h1 style={{ textAlign: "center" }}>加密 / 解密 小工具</h1>

      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
        {/* 左侧明文区域 */}
        <div style={{ flex: 1 }}>
          <h2>明文</h2>
          <textarea
            rows={10}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
            value={plain}
            onChange={(e) => setPlain(e.target.value)}
            placeholder="输入要加密的内容或解密后的明文将显示在这里"
          />
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={handleEncrypt}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              加密 →
            </button>
          </div>
        </div>

        {/* 右侧密文区域 */}
        <div style={{ flex: 1 }}>
          <h2>密文</h2>
          <textarea
            rows={10}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
            value={cipher}
            onChange={(e) => setCipher(e.target.value)}
            placeholder="粘贴要解密的密文或加密后的密文将显示在这里"
          />
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={handleDecrypt}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ← 解密
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
