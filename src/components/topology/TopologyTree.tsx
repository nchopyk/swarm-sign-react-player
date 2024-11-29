import React from 'react';
import { Network } from 'lucide-react';
import type { TopologyNode } from '../../types/topology';

interface TopologyTreeProps {
  topology: TopologyNode;
  level?: number;
}

export default function TopologyTree({ topology, level = 0 }: TopologyTreeProps) {
  const hasChildren = topology.connectedClients && topology.connectedClients.length > 0;

  return (
    <div className={`${level > 0 ? 'ml-6 mt-2' : ''}`}>
      <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-2">
        <Network className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-300">{topology.ip}</span>
          <span className="text-gray-500">:</span>
          <span className="text-gray-400">{topology.port ?? 'N/A'}</span>
          {topology.rating !== null && (
            <>
              <span className="text-gray-500">|</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                topology.rating <= 0.4 ? 'bg-red-500/20 text-red-400' :
                  topology.rating >= 0.7 ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
              }`}>
                Rating: {topology.rating}
              </span>
            </>
          )}
        </div>
      </div>

      {hasChildren && (
        <div className="border-l-2 border-gray-800 ml-2 pl-4 mt-2">
          {topology.connectedClients!.map((client, index) => (
            <TopologyTree
              key={`${client.ip}:${client.port}`}
              topology={client}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
