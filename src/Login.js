import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    await axios.post("http://localhost:3000/send-otp", { email });

    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await axios.post("http://localhost:3000/verify-otp", { email, otp });
    if (res.data.success) {
      navigate("/profile");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default Login;
