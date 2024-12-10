import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import PlayerPage from './pages/PlayerPage';
import LoadingScreen from './components/LoadingScreen';
import InstanceIdBadge from './components/InstanceIdBadge';
import { useAuth } from './hooks/useAuth';
import { useIPC } from './hooks/useIPC';
import { useConnection } from './hooks/useConnection';

function App() {
  const { isLoggedIn } = useAuth();
  const { masterConnection, serverConnection, isSearchingServer } = useConnection();
  const [isInitialized, setIsInitialized] = useState(false);
  useIPC();

  useEffect(() => {
    // Reset initialization when server search starts
    if (isSearchingServer) {
      setIsInitialized(false);
      return;
    }

    // Consider the app initialized when at least one connection is established
    if (masterConnection.isConnected || serverConnection.isConnected) {
      const timer = setTimeout(() => setIsInitialized(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [masterConnection.isConnected, serverConnection.isConnected, isSearchingServer]);

  return (
    <div className="relative min-h-screen">
      {!isInitialized || isSearchingServer ? (
        <>
          <LoadingScreen />
          <InstanceIdBadge />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                isLoggedIn ? <Navigate to="/player" /> : <Navigate to="/login" />
              } />
              <Route path="login" element={
                isLoggedIn ? <Navigate to="/player" /> : <LoginPage />
              } />
              <Route path="player" element={
                isLoggedIn ? <PlayerPage /> : <Navigate to="/login" />
              } />
            </Route>
          </Routes>
          <InstanceIdBadge />
        </>
      )}
    </div>
  );
}

export default App;
