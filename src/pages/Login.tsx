import { KeyRound } from 'lucide-react';

interface LoginProps {
  code: string;
}

export default function Login({ code }: LoginProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
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
        </div>
      </div>
    </div>
  );
}
