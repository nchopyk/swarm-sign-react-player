import React from 'react';
import { Outlet } from 'react-router-dom';
import ConnectionPanel from './ConnectionPanel';
import { useConnection } from '../hooks/useConnection';

export default function Layout() {
  const { masterConnection, serverConnection } = useConnection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <ConnectionPanel 
        masterConnection={masterConnection}
        serverConnection={serverConnection}
      />
      <Outlet />
    </div>
  );
}