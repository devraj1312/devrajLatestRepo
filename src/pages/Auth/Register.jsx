import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { registerUser } from "../../services/authService"; 
import { showSuccess, showError, showWarning } from "../../utils/toast";
import "./auth.scss";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);

  const navigate = useNavigate();

  // ✅ Handle Change + remove error on typing
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Full name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.mobile) {
      newErrors.mobile = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10-digit number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!termsChecked) {
      newErrors.terms = "You must accept terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Register Handler (FINAL LOGIC)
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const data = await registerUser(form);

      // ✅ SUCCESS
      if (data.status === "success") {
        showSuccess(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

    } catch (err) {
      console.error(err);

      const data = err?.response?.data;

      // ⚠️ USER ALREADY EXISTS
      if (data?.status === "exists") {
        showWarning(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

      // ❌ VALIDATION ERROR (NO REDIRECT)
      else if (data?.status === "error") {
        showError(data.message);
      }

      // ❌ FALLBACK
      else {
        showError("Server error ❌");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo">UjjainYatra</div>
      </div>

      <div className="auth-box">
        <h2>Create Your Account</h2>
        <p>Join thousands of happy travelers exploring Ujjain</p>

        {/* Full Name */}
        <label>Full Name</label>
        <div className="input-field">
          <FiUser />
          <input
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
          />
        </div>
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* Email */}
        <label>Email Address</label>
        <div className="input-field">
          <FiMail />
          <input
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* Mobile */}
        <label>Phone Number</label>
        <div className="input-field">
          <FiPhone />
          <input
            name="mobile"
            placeholder="10-digit phone number"
            onChange={handleChange}
          />
        </div>
        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

        {/* Password */}
        <label>Password</label>
        <div className="input-field">
          <FiLock />
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            onChange={handleChange}
          />
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}

        {/* Terms */}
        <div className="terms">
          <input
            type="checkbox"
            onChange={(e) => setTermsChecked(e.target.checked)}
          />
          <span>
            I agree to <b>Terms of Service</b> and <b>Privacy Policy</b>
          </span>
        </div>
        {errors.terms && <p className="error-text">{errors.terms}</p>}

        {/* Button */}
        <button className="primary-btn" onClick={handleRegister}>
          Create Account
        </button>

        {/* Footer */}
        <div className="bottom">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;