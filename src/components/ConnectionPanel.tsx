import React from 'react';
import { Network, Globe, Wifi, WifiOff, Loader2 } from 'lucide-react';
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
            <div className="flex items-center space-x-2 min-w-0">
              <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-sm font-medium truncate">
                {activeConnection.type} Connection
              </span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
              {isConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-400" />
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-3 h-3 text-red-400 animate-spin" />
                    <span className="text-xs text-red-400">Disconnected</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-400">IP Address</p>
              <div className="relative">
                <code className="block text-xs bg-black/40 px-2 py-1 rounded truncate">
                  {activeConnection.ip || 'Not connected'}
                </code>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-400">Port</p>
              <div className="relative">
                <code className="block text-xs bg-black/40 px-2 py-1 rounded truncate">
                  {activeConnection.port || 'N/A'}
                </code>
              </div>
            </div>

            {!isConnected && activeConnection.lastError && (
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Last Error</p>
                <div className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
                  <div className="flex items-start space-x-2">
                    <span className="flex-grow break-words">
                      {activeConnection.lastError}
                    </span>
                    <Loader2 className="w-3 h-3 animate-spin flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              </div>
            )}

            {!isConnected && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Attempting to reconnect...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
