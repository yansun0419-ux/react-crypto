import React, { useState, useEffect } from "react";
import { encrypt, decrypt } from "./utils/crypto";
import "./App.css";

function App() {
  const [plain, setPlain] = useState("");
  const [cipher, setCipher] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const savedPassword = localStorage.getItem("cryptoPassword");
    if (savedPassword) {
      setPassword(savedPassword);
      setIsPasswordValid(true);
    }
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length > 0);
  };

  const savePasswordToStorage = () => {
    if (password) {
      localStorage.setItem("cryptoPassword", password);
    }
  };

  const handleEncrypt = () => {
    if (!isPasswordValid) {
      alert("请先输入密码");
      return;
    }
    savePasswordToStorage();
    setCipher(encrypt(plain, password));
  };

  const handleDecrypt = () => {
    if (!isPasswordValid) {
      alert("请先输入密码");
      return;
    }
    savePasswordToStorage();
    try {
      setPlain(decrypt(cipher, password));
    } catch (error) {
      alert("解密失败，请检查密码是否正确");
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type}已复制到剪贴板`);
    } catch (error) {
      alert("复制失败，请手动复制");
    }
  };

  return (
    <div className="App" style={{ maxWidth: 1200 }}>
      <h1 style={{ textAlign: "center" }}>加密 / 解密 小工具</h1>

      {/* 密码输入区域 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            whiteSpace: "nowrap",
          }}
        >
          加密/解密密码：
        </label>
        <input
          // type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="请输入加密/解密密码"
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            fontSize: "12px",
            color: isPasswordValid ? "#28a745" : "#dc3545",
            whiteSpace: "nowrap",
          }}
        >
          {isPasswordValid ? "✓ 密码已设置" : "⚠ 请输入密码"}
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", marginTop: "10px" }}>
        {/* 左侧明文区域 */}
        <div style={{ flex: 1 }}>
          <h2>明文</h2>
          <textarea
            rows={10}
            style={{
              width: "80%",
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
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => copyToClipboard(plain, "明文")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              复制
            </button>
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
              width: "80%",
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
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
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
            <button
              onClick={() => copyToClipboard(cipher, "密文")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              复制
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
