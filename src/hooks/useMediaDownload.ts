import { create } from 'zustand';
import { Media, PlaylistData } from '../types/media';

interface DownloadState {
  downloads: Record<string, {
    status: 'pending' | 'downloading' | 'complete' | 'error';
    progress: number;
    localUrl?: string;
    error?: string;
  }>;
  setDownloadStatus: (mediaId: string, status: DownloadState['downloads'][string]) => void;
  clearDownloads: () => void;
  cleanupUnusedMedia: (playlist: PlaylistData) => void;
}

export const useMediaDownload = create<DownloadState>((set, get) => ({
  downloads: {},
  setDownloadStatus: (mediaId, status) => 
    set((state) => ({
      downloads: { ...state.downloads, [mediaId]: status }
    })),
  clearDownloads: () => {
    // Cleanup all object URLs before clearing
    Object.values(get().downloads).forEach(download => {
      if (download.localUrl) {
        URL.revokeObjectURL(download.localUrl);
      }
    });
    set({ downloads: {} });
  },
  cleanupUnusedMedia: (playlist: PlaylistData) => {
    const currentState = get();
    const activeMediaIds = new Set(playlist.medias.data.map(item => item.media.id));
    const newDownloads = { ...currentState.downloads };
    let hasChanges = false;

    // Check each download and remove if not in active media
    Object.entries(currentState.downloads).forEach(([mediaId, download]) => {
      if (!activeMediaIds.has(mediaId)) {
        if (download.localUrl) {
          URL.revokeObjectURL(download.localUrl);
        }
        delete newDownloads[mediaId];
        hasChanges = true;
      }
    });

    // Only update state if there were changes
    if (hasChanges) {
      set({ downloads: newDownloads });
    }
  }
}));

export async function downloadMedia(media: Media): Promise<string> {
  const store = useMediaDownload.getState();
  
  // Check if media is already downloaded and valid
  const existing = store.downloads[media.id];
  if (existing?.status === 'complete' && existing.localUrl) {
    try {
      // Verify the object URL is still valid
      const response = await fetch(existing.localUrl);
      if (response.ok) {
        return existing.localUrl;
      }
    } catch {
      // URL is invalid, continue with new download
      URL.revokeObjectURL(existing.localUrl);
    }
  }
  
  try {
    store.setDownloadStatus(media.id, { status: 'downloading', progress: 0 });
    
    const response = await fetch(media.content);
    const reader = response.body?.getReader();
    const contentLength = Number(response.headers.get('Content-Length')) || 0;
    
    if (!reader) throw new Error('Failed to start download');
    
    let receivedLength = 0;
    const chunks: Uint8Array[] = [];
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      receivedLength += value.length;
      
      const progress = (receivedLength / contentLength) * 100;
      store.setDownloadStatus(media.id, { status: 'downloading', progress });
    }
    
    const blob = new Blob(chunks, { type: media.mimeType });
    const localUrl = URL.createObjectURL(blob);
    
    store.setDownloadStatus(media.id, { 
      status: 'complete', 
      progress: 100, 
      localUrl 
    });
    
    return localUrl;
  } catch (error) {
    store.setDownloadStatus(media.id, { 
      status: 'error', 
      progress: 0, 
      error: error instanceof Error ? error.message : 'Download failed' 
    });
    throw error;
  }
}