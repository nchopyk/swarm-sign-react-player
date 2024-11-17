import React from 'react';
import { Loader2, Network, Globe } from 'lucide-react';
import { useConnection } from '../hooks/useConnection';

export default function LoadingScreen() {
  const { masterConnection, serverConnection } = useConnection();
  const activeConnection = masterConnection.isConnected 
    ? { type: 'Master', ...masterConnection, icon: Network }
    : { type: 'Server', ...serverConnection, icon: Globe };
  const isConnected = masterConnection.isConnected || serverConnection.isConnected;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
          
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-white">
              Establishing Connection
            </h1>
            <p className="text-sm text-gray-400">
              {isConnected 
                ? "Connection established, initializing application..."
                : "Waiting for connection to server..."}
            </p>
          </div>

          <div className="w-full">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {isConnected && <activeConnection.icon className="w-4 h-4 text-blue-400" />}
                  <span className="text-sm font-medium text-gray-300">
                    {activeConnection.type} Connection
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? 'bg-green-400' : 'bg-gray-500'
                    }`} 
                  />
                  <span className={`text-xs ${
                    isConnected ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {isConnected ? 'Connected' : 'Waiting...'}
                  </span>
                </div>
              </div>
              {isConnected && (
                <div className="text-xs text-gray-400">
                  <p>{activeConnection.ip}:{activeConnection.port}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}