import { KeyRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface LocationState {
  code?: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();
  const { code = '----' } = (location.state as LocationState) || {};

  return (
    <div className="min-h-screen pl-64">
      <div className="h-screen w-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-blue-500 p-3 rounded-full">
              <KeyRound className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-white">Authentication Code</h1>

            <div className="w-full bg-white/5 rounded-lg p-6 text-center">
              <code className="text-3xl font-mono text-blue-400 tracking-wider">
                {code}
              </code>
            </div>

            <p className="text-gray-400 text-center text-sm">
              Please enter this code in your authentication device to continue
            </p>

            <button
              onClick={() => login()}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Simulate Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
