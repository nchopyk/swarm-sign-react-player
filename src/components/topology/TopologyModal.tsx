import React from 'react';
import { X } from 'lucide-react';
import TopologyTree from './TopologyTree';
import type { TopologyData } from '../../types/topology';

interface TopologyModalProps {
  topology: TopologyData | null;
  onClose: () => void;
}

export default function TopologyModal({ topology, onClose }: TopologyModalProps) {
  if (!topology) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Network Topology</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(80vh-4rem)]">
          <TopologyTree topology={topology} />
        </div>
      </div>
    </div>
  );
}
