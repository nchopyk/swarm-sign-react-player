import React, { useState } from 'react';
import { Network, Globe, Wifi, WifiOff, Loader2, Router, Share2, Users, NetworkIcon, Info } from 'lucide-react';
import { useConnection } from '../hooks/useConnection';
import { useTopology } from '../hooks/useTopology';
import { useMasterRating } from '../hooks/useMasterRating';
import TopologyModal from './topology/TopologyModal';
import MasterInfoModal from './master/MasterInfoModal';

export default function ConnectionPanel() {
  const { masterConnection, serverConnection, masterGateway, masterWebSocket } = useConnection();
  const { topology } = useTopology();
  const { rating } = useMasterRating();
  const [showTopology, setShowTopology] = useState(false);
  const [showMasterInfo, setShowMasterInfo] = useState(false);

  const activeConnection = masterConnection.isConnected
    ? { type: 'Master', ...masterConnection, icon: Network }
    : { type: 'Server', ...serverConnection, icon: Globe };
  const isConnected = masterConnection.isConnected || serverConnection.isConnected;
  const isGatewayEnabled = masterGateway.address !== null && masterGateway.port !== null;
  const isWebSocketEnabled = masterWebSocket.address !== null && masterWebSocket.port !== null;

  const Icon = activeConnection.icon;

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-64 bg-black/30 backdrop-blur-sm text-white p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-4">
            <Icon className="w-4 h-4" />
            <h2 className="text-sm font-semibold">Connection Status</h2>
          </div>

          <div className="space-y-2">
            {/* Connection Status */}
            <div className="p-3 bg-white/5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-xs font-medium truncate">
                    {activeConnection.type} Connection
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 flex-shrink-0 ml-2">
                  {isConnected ? (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-[10px] text-green-400">Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-red-400" />
                      <div className="flex items-center space-x-1">
                        <Loader2 className="w-3 h-3 text-red-400 animate-spin" />
                        <span className="text-[10px] text-red-400">Disconnected</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid gap-1.5">
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">IP Address</p>
                  <code className="block text-[10px] bg-black/40 px-1.5 py-1 rounded">
                    {activeConnection.ip || 'Not connected'}
                  </code>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Port</p>
                  <code className="block text-[10px] bg-black/40 px-1.5 py-1 rounded">
                    {activeConnection.port || 'N/A'}
                  </code>
                </div>

                {!isConnected && activeConnection.lastError && (
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">Last Error</p>
                    <div className="text-[10px] text-red-400 bg-red-400/10 px-1.5 py-1 rounded">
                      <div className="flex items-start space-x-2">
                        <span className="flex-grow break-words">
                          {activeConnection.lastError}
                        </span>
                        <Loader2 className="w-2.5 h-2.5 animate-spin flex-shrink-0 mt-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                {!isConnected && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-400">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                      <span>Attempting to reconnect...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Master Gateway Status */}
            <div className="p-3 bg-white/5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Router className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-medium">Master Gateway</span>
                </div>
                {isGatewayEnabled ? (
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    Enabled
                  </span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-500/20 text-gray-400 rounded-full">
                    Disabled
                  </span>
                )}
              </div>

              <div className="grid gap-1.5">
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Gateway IP</p>
                  <code className="block text-[10px] bg-black/40 px-1.5 py-1 rounded">
                    {masterGateway.address || 'Not configured'}
                  </code>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Gateway Port</p>
                  <code className="block text-[10px] bg-black/40 px-1.5 py-1 rounded">
                    {masterGateway.port || 'N/A'}
                  </code>
                </div>

                {isGatewayEnabled && rating && (
                  <button
                    onClick={() => setShowMasterInfo(true)}
                    className="mt-1 w-full flex items-center justify-center space-x-2 px-2 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded transition-colors"
                  >
                    <Info className="w-3 h-3" />
                    <span className="text-[10px]">Master Info</span>
                  </button>
                )}
              </div>
            </div>

            {/* Master WebSocket Status */}
            <div className="p-3 bg-white/5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-medium">Master WebSocket</span>
                </div>
                {isWebSocketEnabled ? (
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    Enabled
                  </span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-500/20 text-gray-400 rounded-full">
                    Disabled
                  </span>
                )}
              </div>

              <div className="grid gap-1.5">
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">WebSocket IP</p>
                  <code className="block text-[10px] bg-black/40 px-1.5 py-1 rounded">
                    {masterWebSocket.address || 'Not configured'}
                  </code>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">WebSocket Port</p>
                  <code className="block text-[10px] bg-black/40 px-1.5 py-1 rounded">
                    {masterWebSocket.port || 'N/A'}
                  </code>
                </div>

                {isWebSocketEnabled && masterWebSocket.connections !== null && (
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">Active Connections</p>
                    <div className="flex items-center space-x-1.5 bg-black/40 px-1.5 py-1 rounded">
                      <Users className="w-3 h-3 text-indigo-400" />
                      <code className="text-[10px]">
                        {masterWebSocket.connections}
                      </code>
                    </div>
                  </div>
                )}

                {isWebSocketEnabled && (
                  <button
                    onClick={() => setShowTopology(true)}
                    className="mt-1 w-full flex items-center justify-center space-x-2 px-2 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded transition-colors"
                  >
                    <NetworkIcon className="w-3 h-3" />
                    <span className="text-[10px]">Show Topology</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTopology && topology && (
        <TopologyModal
          topology={topology}
          onClose={() => setShowTopology(false)}
        />
      )}

      {showMasterInfo && rating && (
        <MasterInfoModal
          data={rating}
          onClose={() => setShowMasterInfo(false)}
        />
      )}
    </>
  );
}
