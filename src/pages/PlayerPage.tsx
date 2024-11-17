import { useLocation } from 'react-router-dom';
import Player from '../components/Player';
import type { PlaylistData } from '../types/media';

interface LocationState {
  schedule?: PlaylistData | null;
}

export default function PlayerPage() {
  const location = useLocation();
  const { schedule } = (location.state as LocationState) || {};

  return (
    <div className="min-h-screen pl-64">
      <div className="h-screen w-full p-2">
        <Player playlist={schedule} />
      </div>
    </div>
  );
}