import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import verifyotpimg from '../../assets/auth-page-images/email verification.jpg'; // Assuming you have an image for OTP verification
import { verifyOtp } from '../../services/authService';
import ForgotPassImage from '../../assets/auth-page-images/red.jpg';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const mode = location.state?.mode; 

  const content = {
    signup: {
      title: 'Verify your email',
      description: `A confirmation code was sent to`,
      buttonText: 'Next',
    },
    forgot: {
      title: 'Password Reset',
      description: `We send a code to`,
      buttonText: 'Continue',
    }
  };

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      return alert('Please enter the 6-digit OTP');
    }

    try {
      const response = await verifyOtp(email, otpValue);

      if (response.data?.message === 'OTP verified successfully for setting password') {
        if(mode === 'signup') {
          navigate('/confirmpassword', { state: { email, mode: "signup" } });
        } else if(mode === 'forgot') {
          navigate('/confirmpassword', { state: { email, mode: "forgot" } });
        }
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    }
  };

  const handleResend = async () => {
    alert("Resend OTP logic to be implemented!");
    // You can hit resend-otp endpoint here if available
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left image side */}
      <div className="col-md-6 d-none d-md-flex" style={{ height: '100vh' }}>
      <img
            src={mode === "signup"? verifyotpimg : ForgotPassImage}
            alt="Signup Illustration"
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>

      {/* Right form side */}
      <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>{content[mode].title}</h2>
        <p>{content[mode].description} <strong>{email}</strong></p>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'space-around' }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={el => inputRefs.current[index] = el}
                style={{
                  width: '40px',
                  height: '50px',
                  textAlign: 'center',
                  fontSize: '24px',
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              />
            ))}
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px'
          }}>
            {content[mode].buttonText}
          </button>
        </form>

        <p style={{ marginTop: '16px', fontSize: '14px' }}>
          Didn’t receive an email? <button onClick={handleResend} style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}>Resend</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
