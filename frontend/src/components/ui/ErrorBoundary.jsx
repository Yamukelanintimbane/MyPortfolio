import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-500 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 max-w-md text-center">
            <AlertTriangle size={64} className="text-yellow-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-accent-purple text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw size={18} />
                <span>Refresh Page</span>
              </button>
              <a
                href="/"
                className="w-full border border-gray-600 text-white py-3 rounded-xl font-semibold hover:border-accent-purple hover:bg-accent-purple/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Home size={18} />
                <span>Go Home</span>
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="text-gray-400 cursor-pointer">Error Details</summary>
                <pre className="text-red-400 text-xs mt-2 p-2 bg-red-400/10 rounded overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;