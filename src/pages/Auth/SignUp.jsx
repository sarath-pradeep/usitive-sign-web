import { useState } from 'react';
import signupImage from '../../assets/auth-page-images/signup.jpg'; // Replace with actual illustration
import { addUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/auth-page-images/devicon_google.png';
import microsoftLogo from '../../assets/auth-page-images/logos_microsoft-icon.png';
import linkedinLogo from '../../assets/auth-page-images/Vector.png';
// import '../../styles/Signup.css'; // Optional if custom styling is needed


function Signup() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    source: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      companyName: formData.company,
      referralSource: formData.source,
    };
  
    try {
      const result = await addUser(userData);
      console.log('Signup successful:', result);
      if (result.message === 'OTP has been send to User' && result.email) {
        navigate('/verify', { state: { email: result.email } });
      } else {
        alert('Signup successful, but OTP not triggered.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.error || 'Signup failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100">
        {/* Left Illustration */}
        <div className="col-md-6 d-none d-md-flex" style={{ height: '100vh' }}>
        <img
            src={signupImage}
            alt="Signup Illustration"
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center' }}
        />
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75 text-start mx-auto">
            <h2 className="mb-2">Get started</h2>
            <p className="mb-4 text-muted">Sign up and simplify your document workflow!</p>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Your email *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="xyz@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Company name</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">How did you hear about us? *</label>
                <select
                  className="form-select"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Friend or Colleague">Friend or Colleague</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign Up
              </button>

              <div className="text-center my-2 text-muted">Or Sign up with</div>

              <div className="d-flex gap-2 justify-content-center">
                    <button type="button" className="btn btn-outline-secondary">
                        <img src={googleLogo} alt="Google" style={{ height: "20px" }} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                        <img src={microsoftLogo} alt="Microsoft" style={{ height: "20px" }} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                        <img src={linkedinLogo} alt="LinkedIn" style={{ height: "20px" }} />
                    </button>
                </div>

              <div className="text-center">
                <small className="text-muted">
                  Already have an account? <a href="/signin">Log in</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
