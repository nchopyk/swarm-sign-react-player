import React from 'react';
import { Loader2, Network, Globe, Server } from 'lucide-react';
import { useConnection } from '../hooks/useConnection';
import type { MasterDevice } from '../ipc/types';

function MasterDeviceItem({ master, isSelected }: { master: MasterDevice, isSelected: boolean }) {
  return (
    <div className={`p-3 rounded-lg ${
      isSelected ? 'bg-blue-500/20 border border-blue-500/50' : 'bg-black/20'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">
            {master.address}:{master.port}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            {master.connections} connections
          </span>
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-blue-400" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoadingScreen() {
  const { 
    connectionMode,
    masterConnection,
    serverConnection,
    availableMasters,
    selectedMaster
  } = useConnection();

  const isConnected = masterConnection.isConnected || serverConnection.isConnected;
  const masters = Object.values(availableMasters);
  const hasMasters = masters.length > 0;

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
                : `Attempting ${connectionMode} connection...`}
            </p>
          </div>

          <div className="w-full space-y-4">
            {/* Connection Mode */}
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">
                  Connection Mode
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  connectionMode === 'proxy' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {connectionMode === 'proxy' ? 'Proxy' : 'Direct'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                {connectionMode === 'proxy' ? (
                  <>
                    <Network className="w-4 h-4" />
                    <span>Connecting through master device</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    <span>Direct server connection</span>
                  </>
                )}
              </div>
            </div>

            {/* Available Masters */}
            {connectionMode === 'proxy' && (
              <div className="bg-black/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">
                    Available Master Devices
                  </span>
                  <span className="text-xs text-gray-400">
                    {hasMasters ? `${masters.length} found` : 'Searching...'}
                  </span>
                </div>

                <div className="space-y-2">
                  {hasMasters ? (
                    masters.map(master => (
                      <MasterDeviceItem 
                        key={master.id}
                        master={master}
                        isSelected={selectedMaster?.id === master.id}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">
                        No master devices found yet...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Connection Status */}
            {isConnected && (
              <div className="bg-black/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {connectionMode === 'proxy' ? (
                      <Network className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Globe className="w-4 h-4 text-purple-400" />
                    )}
                    <span className="text-sm font-medium text-gray-300">
                      {connectionMode === 'proxy' ? 'Master Connection' : 'Server Connection'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-green-400">Connected</span>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-400">
                  {connectionMode === 'proxy' ? (
                    <p>{masterConnection.ip}:{masterConnection.port}</p>
                  ) : (
                    <p>{serverConnection.ip}:{serverConnection.port}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}