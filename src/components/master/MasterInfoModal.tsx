import React from 'react';
import { X, Wifi, Cpu, HardDrive, Clock, Network, Users, Signal } from 'lucide-react';
import type { MasterRatingData } from '../../types/master';

interface MasterInfoModalProps {
  data: MasterRatingData;
  onClose: () => void;
}

function MetricCard({
                      icon: Icon,
                      title,
                      value,
                      normalized,
                      unit = '',
                      colorClass = 'text-blue-400'
                    }: {
  icon: React.ElementType;
  title: string;
  value: number;
  normalized: number;
  unit?: string;
  colorClass?: string;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className={`w-4 h-4 ${colorClass}`} />
          <span className="text-sm font-medium text-gray-300">{title}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          normalized <= 0.4 ? 'bg-red-500/20 text-red-400' :
            normalized >= 0.7 ? 'bg-green-500/20 text-green-400' :
              'bg-yellow-500/20 text-yellow-400'
        }`}>
          Score: {normalized.toFixed(2)}
        </span>
      </div>
      <div className="text-2xl font-semibold text-white">
        {value}
        {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
      </div>
    </div>
  );
}

export default function MasterInfoModal({ data, onClose }: MasterInfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-white">Master Device Status</h2>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                data.rating <= 0.4 ? 'bg-red-500/20 text-red-400' :
                  data.rating >= 0.7 ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
              }`}>
                Rating: {data.rating.toFixed(4)}
              </span>
              {/*<span className="text-xs text-gray-400">*/}
              {/*  ({(data.rating * 100).toFixed(0)}%)*/}
              {/*</span>*/}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              icon={Users}
              title="Connected Devices"
              value={data.connectedDevices.count}
              normalized={data.connectedDevices.normalized}
              colorClass="text-indigo-400"
            />
            <MetricCard
              icon={Signal}
              title="Wi-Fi Signal"
              value={data.wifiSignal.dbm}
              normalized={data.wifiSignal.normalized}
              unit="dBm"
              colorClass="text-purple-400"
            />
            <MetricCard
              icon={Cpu}
              title="Processor Load"
              value={data.processorLoad.percent}
              normalized={data.processorLoad.normalized}
              unit="%"
              colorClass="text-red-400"
            />
            <MetricCard
              icon={HardDrive}
              title="Free RAM"
              value={data.freeRam.mb}
              normalized={data.freeRam.normalized}
              unit="MB"
              colorClass="text-green-400"
            />
            <MetricCard
              icon={HardDrive}
              title="Total RAM"
              value={data.totalRam.mb}
              normalized={data.totalRam.normalized}
              unit="MB"
              colorClass="text-emerald-400"
            />
            <MetricCard
              icon={Clock}
              title="Uptime"
              value={data.uptime.seconds}
              normalized={data.uptime.normalized}
              unit="s"
              colorClass="text-yellow-400"
            />
          </div>

          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">
                  Internet Connection
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                data.internetConnection.normalized <= 0.4 ? 'bg-red-500/20 text-red-400' :
                  data.internetConnection.normalized >= 0.7 ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
              }`}>
                Score: {data.internetConnection.normalized.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-lg font-semibold text-white capitalize">
                {data.internetConnection.type}
              </span>
              {data.internetConnection.type === 'wireless' && (
                <Wifi className="w-5 h-5 text-blue-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
