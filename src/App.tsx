import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import PlayerPage from './pages/PlayerPage';
import { useAuth } from './hooks/useAuth';
import { useIPC } from './hooks/useIPC';

function App() {
  const { isLoggedIn } = useAuth();
  useIPC(); // Initialize IPC listeners

  return (
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
  );
}

export default App;
