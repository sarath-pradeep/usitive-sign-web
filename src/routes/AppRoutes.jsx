import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/Auth/SignIn';
import Signup from '../pages/Auth/SignUp';
import VerifyOtp from '../pages/Auth/otpVerify';
import SetPassword from '../pages/Auth/SetPassword';
import ForgotPassword from '../pages/Auth/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path='/signup' element={<Signup />} />
      <Route path ="/verify" element={<VerifyOtp />} />
      <Route path='/confirmpassword' element={<SetPassword />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;
