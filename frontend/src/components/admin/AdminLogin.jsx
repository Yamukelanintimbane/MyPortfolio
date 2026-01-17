import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../utils/api';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Code2,
  Shield
} from 'lucide-react';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try real API login first
      const response = await authAPI.login({
        email: credentials.username, // Using username as email for compatibility
        password: credentials.password
      });
      
      // Store token from real API response
      localStorage.setItem('portfolio-token', response.data.token);
      
      // Fetch user profile from real API
      const profileResponse = await authAPI.getProfile();
      const user = profileResponse.data.data;
      
      localStorage.setItem('portfolio-user', JSON.stringify(user));
      
      // Update auth context
      login(user);
      navigate('/admin/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback for demo mode - check hardcoded credentials
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        console.log('Using demo fallback authentication');
        
        // Create demo user object
        const demoUser = {
          id: 'demo-admin',
          username: 'admin',
          email: 'admin@demo.com',
          name: 'Demo Admin',
          role: 'admin',
          isDemo: true
        };
        
        // Create a demo token (not real JWT, just for demo purposes)
        const demoToken = 'demo-token-' + Date.now();
        
        localStorage.setItem('portfolio-token', demoToken);
        localStorage.setItem('portfolio-user', JSON.stringify(demoUser));
        
        login(demoUser);
        navigate('/admin/dashboard');
        return;
      }
      
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 to-dark-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="w-20 h-20 bg-accent-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Shield size={32} className="text-accent-purple" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Access your portfolio dashboard</p>
          <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-400 text-sm">
              <strong>Demo Credentials:</strong><br/>
              Username: <code>admin</code><br/>
              Password: <code>admin123</code>
            </p>
          </div>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full bg-dark-400 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full bg-dark-400 border border-gray-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="Enter admin password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-purple text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Shield size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Back to Portfolio */}
          <div className="text-center">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Portfolio
            </a>
          </div>
        </motion.form>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-gray-500 text-sm">
            Development mode - For demonstration only
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;