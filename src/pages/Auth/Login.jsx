import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSmartphone,
} from "react-icons/fi";

import { loginUser, sendOtp, verifyOtp } from "../../services/authService";
import { showSuccess, showError } from "../../utils/toast";
import "./auth.scss";

const Login = () => {

  const [loginType, setLoginType] = useState("otp");
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ PASSWORD LOGIN (UNCHANGED)
  const handleLogin = async () => {
    try {
      const data = await loginUser(form);

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        showSuccess("Login successful");
        navigate(redirectTo);
      }

    } catch (err) {
      showError(err?.response?.data?.message || "Login failed ❌");
    }
  };

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      setErrors({ mobile: "Enter valid mobile number" });
      return;
    }

    try {
      const data = await sendOtp({ phone: form.mobile });

      showSuccess(`OTP sent: ${data.otp}`);
      setOtpSent(true);
      setTimer(30);

      // auto fill
      if (data.otp) {
        const otpArray = data.otp.toString().split("");
        setOtp(otpArray);

        setTimeout(() => {
          inputsRef.current[5]?.focus();
        }, 100);
      } else {
        setOtp(new Array(6).fill(""));
      }

    } catch (err) {
      showError(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setErrors({ otp: "Enter valid OTP" });
      return;
    }

    try {
      const data = await verifyOtp({
        phone: form.mobile,
        otp: finalOtp,
      });

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        showSuccess("Login successful");
        navigate("/");
      }

    } catch (err) {
      showError(err?.response?.data?.message || "Invalid OTP ❌");
    }
  };

  // 🔥 OTP INPUT HANDLING
  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        e.target.previousSibling.focus();
      }

      setOtp(newOtp);
    }
  };

  // 🔥 TIMER
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo">UjjainYatra</div>
      </div>

      <div className="auth-box">

        <h2>Welcome Back!</h2>
        <p>Sign in to continue your sacred journey</p>

        {/* TOGGLE */}
        <div className="login-toggle">
          <button
            className={loginType === "otp" ? "active" : ""}
            onClick={() => {
              setLoginType("otp");
              setOtpSent(false);
              setOtp(new Array(6).fill(""));
              setTimer(0);
            }}
          >
            OTP
          </button>

          <button
            className={loginType === "password" ? "active" : ""}
            onClick={() => setLoginType("password")}
          >
            Password
          </button>
        </div>

        {/* MOBILE */}
        <label>Mobile</label>
        <div className="input-field">
          <FiSmartphone />
          <input
            name="mobile"
            placeholder="Enter mobile number"
            onChange={handleChange}
          />
        </div>
        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

        {/* PASSWORD LOGIN */}
        {loginType === "password" && (
          <>
            <label>Password</label>
            <div className="input-field">
              <FiLock />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button className="primary-btn" onClick={handleLogin}>
              → Sign In
            </button>
          </>
        )}

        {/* OTP FLOW */}
        {loginType === "otp" && (
          <>
            {!otpSent ? (
              <button className="primary-btn" onClick={handleSendOtp}>
                → Send OTP
              </button>
            ) : (
              <>
                <label>Enter OTP</label>

                <div className="otp-container">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    />
                  ))}
                </div>

                {errors.otp && <p className="error-text">{errors.otp}</p>}

                <button className="primary-btn" onClick={handleVerifyOtp}>
                  → Verify OTP
                </button>

                <p className="resend-text">
                  {timer > 0 ? (
                    `Resend OTP in ${timer}s`
                  ) : (
                    <span onClick={handleSendOtp}>Resend OTP</span>
                  )}
                </p>
              </>
            )}
          </>
        )}

        <div className="bottom">
          Don’t have an account?
          <span onClick={() => navigate("/register")}>
            Create Account
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;