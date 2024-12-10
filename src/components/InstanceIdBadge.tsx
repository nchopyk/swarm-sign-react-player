import React from 'react';
import { Hash } from 'lucide-react';
import { useInstanceId } from '../hooks/useInstanceId';

export default function InstanceIdBadge() {
  const { instanceId } = useInstanceId();

  if (instanceId === null) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2 z-50">
      <Hash className="w-4 h-4 text-blue-400" />
      <span className="text-sm text-gray-300">Instance {instanceId}</span>
    </div>
  );
}
