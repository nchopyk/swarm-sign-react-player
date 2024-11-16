import { useLocation } from 'react-router-dom';
import Player from '../components/Player';
import type { PlaylistData } from '../types/media';

// Sample playlist data for development/fallback
const samplePlaylist: PlaylistData = {
  "schedule": {
    "id": "e220d2f0-30f1-44e9-8c46-964bfa8118cb",
    "organizationId": "82d36a8c-d72c-48c7-8e57-d5214c9b0aef",
    "name": "Test 1",
    "notes": null,
    "screenId": "aae7cd5d-9bdf-4bb7-86b0-ec84e47aedee",
    "playlistId": "ee937953-d69d-47e9-ae44-872d143b3c38",
    "createdAt": "2024-11-11T18:43:40.419Z",
    "updatedAt": "2024-11-11T18:43:40.419Z"
  },
  "playlist": {
    "id": "ee937953-d69d-47e9-ae44-872d143b3c38",
    "organizationId": "82d36a8c-d72c-48c7-8e57-d5214c9b0aef",
    "name": "Lobby playlist",
    "notes": null,
    "createdAt": "2024-11-06T19:24:38.807Z",
    "updatedAt": "2024-11-06T19:24:38.807Z"
  },
  "medias": {
    "data": [
      {
        "id": "c7a6abb3-91d4-4792-86e3-4101678ec7d5",
        "playlistId": "ee937953-d69d-47e9-ae44-872d143b3c38",
        "mediaId": "baba5232-7794-41ac-9762-55ad7aca192d",
        "duration": "10",
        "createdAt": "2024-11-06T19:24:38.807Z",
        "updatedAt": "2024-11-06T19:24:38.807Z",
        "media": {
          "id": "baba5232-7794-41ac-9762-55ad7aca192d",
          "organizationId": "82d36a8c-d72c-48c7-8e57-d5214c9b0aef",
          "name": "fallback-2",
          "notes": null,
          "content": "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
          "type": "image",
          "duration": null,
          "width": 7680,
          "height": 4320,
          "mimeType": "image/jpeg",
          "size": 8692459,
          "createdAt": "2024-11-06T19:02:13.905Z",
          "updatedAt": "2024-11-06T19:02:13.905Z"
        }
      },
      {
        "id": "eadc5b2c-127a-4d6a-95b6-8da605bb14df",
        "playlistId": "ee937953-d69d-47e9-ae44-872d143b3c38",
        "mediaId": "d46f56f5-8f47-44f8-91a3-dea8723fe797",
        "duration": "10",
        "createdAt": "2024-11-06T19:24:38.807Z",
        "updatedAt": "2024-11-06T19:24:38.807Z",
        "media": {
          "id": "d46f56f5-8f47-44f8-91a3-dea8723fe797",
          "organizationId": "82d36a8c-d72c-48c7-8e57-d5214c9b0aef",
          "name": "fallback-1",
          "notes": null,
          "content": "https://images.unsplash.com/photo-1682687218147-9806132dc697",
          "type": "image",
          "duration": null,
          "width": 5120,
          "height": 2880,
          "mimeType": "image/jpeg",
          "size": 7296365,
          "createdAt": "2024-11-06T19:02:23.482Z",
          "updatedAt": "2024-11-06T19:02:23.482Z"
        }
      }
    ]
  }
};

interface LocationState {
  schedule?: PlaylistData;
}

export default function PlayerPage() {
  const location = useLocation();
  const { schedule } = (location.state as LocationState) || {};

  return (
    <div className="min-h-screen pl-64">
      <div className="h-screen w-full p-2">
        <Player playlist={schedule || samplePlaylist} />
      </div>
    </div>
  );
}
