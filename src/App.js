import React, { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const OTP_SIZE = 5;
  const [otpInput, setOtpInput] = useState(new Array(OTP_SIZE).fill(""));
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return;
    }

    setOtpInput((prev) => {
      const updated = [...prev];
      updated[index] = value.slice(-1);
      return updated;
    });

    if (value && index < OTP_SIZE - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackSpace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otpInput[index]) {
      inputsRef.current[index - 1].focus();
      setOtpInput((prev) => {
        const updated = [...prev];
        updated[index] = "";
        return updated;
      });
    }
  };
  return (
    <div className="App">
      <div className="header">
        <h1>OTP VALIDATION</h1>
      </div>
      <div className="otp-input">
        {otpInput.map((otp, index) => (
          <input
            key={index}
            type="text"
            className="otp-input-box"
            value={otp}
            onChange={(e) => handleInputChange(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            onKeyDown={(e) => handleBackSpace(e, index)}
          />
        ))}
      </div>
    </div>
  );
}
