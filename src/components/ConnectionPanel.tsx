import React from 'react';
import { Network, Globe, Wifi, WifiOff } from 'lucide-react';
import { useConnection } from '../hooks/useConnection';

export default function ConnectionPanel() {
  const { masterConnection, serverConnection } = useConnection();
  const activeConnection = masterConnection.isConnected 
    ? { type: 'Master', ...masterConnection, icon: Network }
    : { type: 'Server', ...serverConnection, icon: Globe };
  const isConnected = masterConnection.isConnected || serverConnection.isConnected;

  const Icon = activeConnection.icon;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black/30 backdrop-blur-sm text-white p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Connection Status</h2>
        </div>
        
        <div className="space-y-4 p-4 bg-white/5 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">
                {activeConnection.type} Connection
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-xs ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-400">IP Address</p>
              <code className="block text-xs bg-black/40 px-2 py-1 rounded">
                {activeConnection.ip || 'Not connected'}
              </code>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-400">Port</p>
              <code className="block text-xs bg-black/40 px-2 py-1 rounded">
                {activeConnection.port || 'N/A'}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}