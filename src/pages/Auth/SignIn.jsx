import { useState } from 'react';
import singinImage from '../../assets/auth-page-images/14.jpg';
import googleLogo from '../../assets/auth-page-images/devicon_google.png';
import microsoftLogo from '../../assets/auth-page-images/logos_microsoft-icon.png';
import linkedinLogo from '../../assets/auth-page-images/Vector.png';
import { loginUser } from '../../services/authService';

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(email, password);
      console.log('Login success:', data);
      alert('Login successful!');  
      // Save token if returned (optional)
      localStorage.setItem('token', data.token);

      // Redirect to dashboard or another page
      // window.location.href = '/dashboard';
    } catch (err) {
        console.error('Login error:', err);
      setError(err || 'Login failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100">
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-flex" style={{ height: '100vh' }}>
          <img
            src={singinImage}
            alt="Welcome Illustration"
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75 text-start mx-auto">
            <h2 className="mb-2">Welcome back!</h2>
            <p className="mb-4">Log in to manage your documents effortlessly</p>

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

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password *</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && <div className="text-danger mb-3">{error}</div>}

              <div className="mb-3 text-end">
                <a href="forgotpassword" className="text-decoration-none">Forgot your password?</a>
              </div>

              <button type="submit" className="btn btn-primary w-100">Log In</button>

              <div className="text-center my-3">
                <span className="text-muted">Or Log in With</span>
              </div>

                <div className="d-flex gap-2 justify-content-center">
                    <button type="button" className="btn btn-outline-secondary" style ={{width : "150px"}}>
                        <img src={googleLogo} alt="Google" style={{ height: "20px" }} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" style ={{width : "150px"}}>
                        <img src={microsoftLogo} alt="Microsoft" style={{ height: "20px" }} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" style ={{width : "150px"}}>
                        <img src={linkedinLogo} alt="LinkedIn" style={{ height: "20px" }} />
                    </button>
                </div>


              <div className="text-center mt-4">
                <small>Don't have an account? <a href="signup">Sign Up</a></small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
