import { useState, useEffect } from 'react';
import { healthAPI, authAPI, hireAPI, adminHireAPI } from '../utils/api';

const TestConnection = () => {
  const [results, setResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  const runTests = async () => {
    setIsTesting(true);
    setResults([]);
    
    const newResults = [];

    try {
      // Test 1: Health check
      newResults.push({ test: 'Health Check', status: 'running' });
      const healthResponse = await healthAPI.check();
      newResults[newResults.length - 1] = { 
        test: 'Health Check', 
        status: 'success',
        data: healthResponse.data
      };

      // Test 2: Hire request submission
      newResults.push({ test: 'Hire Request Submission', status: 'running' });
      const hireData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test hire request',
        budget: '5000-15000',
        timeline: 'ASAP'
      };
      const hireResponse = await hireAPI.submit(hireData);
      newResults[newResults.length - 1] = { 
        test: 'Hire Request Submission', 
        status: 'success',
        data: hireResponse.data
      };

      // Test 3: Admin login
      newResults.push({ test: 'Admin Login', status: 'running' });
      const loginData = {
        email: 'admin@portfolio.com',
        password: 'admin123'
      };
      const loginResponse = await authAPI.login(loginData);
      newResults[newResults.length - 1] = { 
        test: 'Admin Login', 
        status: 'success',
        data: { token: loginResponse.data.token }
      };
      
      // Store token for next test
      localStorage.setItem('portfolio-token', loginResponse.data.token);

      // Test 4: Admin hire requests fetch
      newResults.push({ test: 'Admin Hire Requests Fetch', status: 'running' });
      const adminHireResponse = await adminHireAPI.getAll();
      newResults[newResults.length - 1] = { 
        test: 'Admin Hire Requests Fetch', 
        status: 'success',
        data: adminHireResponse.data
      };

      // Clean up
      localStorage.removeItem('portfolio-token');

    } catch (error) {
      console.error('Test failed:', error);
      if (newResults.length > 0 && newResults[newResults.length - 1].status === 'running') {
        newResults[newResults.length - 1] = { 
          ...newResults[newResults.length - 1],
          status: 'error',
          error: error.response?.data || error.message
        };
      }
    }

    setResults(newResults);
    setIsTesting(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">API Connection Test</h1>
      <p className="text-gray-400 mb-4">This page tests the connection between frontend and backend.</p>

      <button
        onClick={runTests}
        disabled={isTesting}
        className="bg-accent-purple text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors mb-6 disabled:opacity-50"
      >
        {isTesting ? 'Testing...' : 'Run Connection Tests'}
      </button>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className={`glass rounded-lg p-4 ${
            result.status === 'success' ? 'border-l-4 border-green-500' :
            result.status === 'error' ? 'border-l-4 border-red-500' :
            'border-l-4 border-yellow-500'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-semibold">{result.test}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                result.status === 'success' ? 'bg-green-500/20 text-green-400' :
                result.status === 'error' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {result.status.toUpperCase()}
              </span>
            </div>

            {result.status === 'success' && result.data && (
              <div className="text-gray-300 text-sm mt-2">
                <pre className="overflow-x-auto">{JSON.stringify(result.data, null, 2)}</pre>
              </div>
            )}

            {result.status === 'error' && result.error && (
              <div className="text-red-400 text-sm mt-2">
                <pre className="overflow-x-auto">{JSON.stringify(result.error, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && !isTesting && (
        <div className="text-center py-12 text-gray-400">
          <p>No tests run yet. Click the button above to test the API connection.</p>
        </div>
      )}
    </div>
  );
};

export default TestConnection;