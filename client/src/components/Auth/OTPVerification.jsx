import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const OTPVerification = () => {
  const { handleVerifyOtp } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleVerifyOtp(email, otp);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPVerification;
