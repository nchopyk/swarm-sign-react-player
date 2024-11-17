export interface Schedule {
  id: string;
  organizationId: string;
  name: string;
  notes: string | null;
  start?: string;
  end?: string;
  screenId: string;
  playlistId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Playlist {
  id: string;
  organizationId: string;
  name: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  organizationId: string;
  name: string;
  notes: string | null;
  content: string;
  type: 'image' | 'video';
  duration: number | null;
  width: number;
  height: number;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlaylistMedia {
  id: string;
  playlistId: string;
  mediaId: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  media: Media;
}

export interface PlaylistData {
  schedule: Schedule;
  playlist: Playlist;
  medias: {
    data: PlaylistMedia[];
  };
}