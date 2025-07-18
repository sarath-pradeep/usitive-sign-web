import { useState } from "react";
import setPasswordImage from "../../assets/auth-page-images/password.jpg"; // Replace with your actual image path
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserPassword } from "../../services/authService";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const location = useLocation();
  const email = location.state?.email || '';
  const navigate = useNavigate();  

  const validatePassword = (pwd) => {
    return {
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  };

  const validations = validatePassword(password);
  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      // Call your API or handle password submission here
      const data = await setUserPassword(email, password);
      console.log("Password set:", password);
      if(data && data.message === "Password set successfully") {
        // Redirect or show success message
        alert("Password set successfully!");
        // Redirect to login or another page
        navigate('/signin');
      } else {
        alert("Failed to set password: " + (data.message || "Unknown error"));
      }
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row g-0" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Left image */}
        <div className="col-md-6 d-none d-md-flex" style={{ height: '100vh' }}>
          <img
            src={setPasswordImage}
            alt="Set Password Illustration"
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>

        {/* Right form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75 text-start">
            <h2 className="mb-2 fw-bold">Set your password</h2>
            <p className="mb-4 text-muted">Your account login will be <strong>{email}</strong></p>

            <form onSubmit={handleSubmit}>
              {/* Password input */}
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setTouched(true);
                  }}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d"
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {/* Password validations */}
              {touched && (
                <ul className="text-muted small mb-4 ps-3">
                  <li className={validations.length ? "text-success" : ""}>
                    Must be at least 6 characters long.
                  </li>
                  <li className={validations.uppercase && validations.lowercase && validations.number && validations.special ? "text-success" : ""}>
                    Password must include an uppercase, a lowercase, a number & a special character.
                  </li>
                </ul>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={!isPasswordValid}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
