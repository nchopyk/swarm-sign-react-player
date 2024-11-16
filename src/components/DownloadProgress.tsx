import React from 'react';
import { Download, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface DownloadProgressProps {
  total: number;
  completed: number;
  failed: number;
  inProgress: number;
}

export default function DownloadProgress({ 
  total, 
  completed, 
  failed, 
  inProgress 
}: DownloadProgressProps) {
  const progress = (completed / total) * 100;

  return (
    <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-white">Downloading Media</span>
        </div>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400">{completed}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            <span className="text-blue-400">{inProgress}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400">{failed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}