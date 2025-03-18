import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/google`,
        { credential: credentialResponse.credential }
      );
      console.log("Login successful");
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isGuest', 'false');
      navigate('/contests');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    localStorage.removeItem('userEmail'); // Ensure no email reminders for guests
    localStorage.removeItem('token');
    navigate('/contests');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Contest Tracker
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to get contest reminders
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                or
              </span>
            </div>
          </div>

          <button
            onClick={continueAsGuest}
            className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Continue as Guest
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Note: Guest users won't receive email reminders for contests
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;