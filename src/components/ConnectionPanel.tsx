import React from 'react';
import { Wifi, WifiOff, Server, Network, Globe } from 'lucide-react';

interface ConnectionInfo {
  isConnected: boolean;
  ip: string;
  port: number;
}

interface ConnectionPanelProps {
  masterConnection: ConnectionInfo;
  serverConnection: ConnectionInfo;
}

function ConnectionStatus({ type, info, icon: Icon }: { 
  type: string;
  info: ConnectionInfo;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-4 p-4 bg-white/5 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">{type}</span>
        </div>
        <div className="flex items-center space-x-2">
          {info.isConnected ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-xs ${info.isConnected ? "text-green-400" : "text-red-400"}`}>
            {info.isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-xs text-gray-400">IP Address</p>
          <code className="block text-xs bg-black/40 px-2 py-1 rounded">{info.ip}</code>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Port</p>
          <code className="block text-xs bg-black/40 px-2 py-1 rounded">{info.port}</code>
        </div>
      </div>
    </div>
  );
}

export default function ConnectionPanel({ masterConnection, serverConnection }: ConnectionPanelProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black/30 backdrop-blur-sm text-white p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Server className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Connection Status</h2>
        </div>
        
        <div className="space-y-4">
          <ConnectionStatus 
            type="Master (Proxy)" 
            info={masterConnection}
            icon={Network}
          />
          
          <ConnectionStatus 
            type="Server (Direct)" 
            info={serverConnection}
            icon={Globe}
          />
        </div>
      </div>
    </div>
  );
}