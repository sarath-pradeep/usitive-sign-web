import { useState } from 'react';
import ForgotPassImage from '../../assets/auth-page-images/red.jpg';
import { forgotPassword, loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await forgotPassword(email);
      navigate('/verify', { state: { email: result.email, mode: "forgot" } });  
    } catch (err) {
        console.error('Login error:', err);
    //   setError(err || 'Login failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100">
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-flex" style={{ height: '100vh' }}>
          <img
            src={ForgotPassImage}
            alt="Welcome Illustration"
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75 text-start mx-auto">
            <h2 className="mb-2">Forgot Password?</h2>
            <p className="mb-4">Enter your email registered with Usitive Sign</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your email *</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <div className="text-danger mb-3">{error}</div>}

              <button type="submit" className="btn btn-primary w-100">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
