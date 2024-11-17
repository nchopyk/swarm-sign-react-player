import React, { useState, useEffect, useRef } from 'react';
import { PlaylistData } from '../types/media';
import { PlayCircle, AlertCircle } from 'lucide-react';
import { useMediaDownload, downloadMedia } from '../hooks/useMediaDownload';
import DownloadProgress from './DownloadProgress';

interface PlayerProps {
  playlist?: PlaylistData | null;
}

export default function Player({ playlist }: PlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const downloads = useMediaDownload((state) => state.downloads);
  const clearDownloads = useMediaDownload((state) => state.clearDownloads);
  const cleanupUnusedMedia = useMediaDownload((state) => state.cleanupUnusedMedia);

  const hasContent = playlist?.medias.data.length && playlist?.medias.data.length > 0;
  const currentMedia = hasContent ? playlist?.medias.data[currentIndex] : null;

  const downloadStats = playlist ? {
    total: playlist.medias.data.length,
    completed: Object.values(downloads).filter(d => d.status === 'complete').length,
    failed: Object.values(downloads).filter(d => d.status === 'error').length,
    inProgress: Object.values(downloads).filter(d => d.status === 'downloading').length,
  } : null;

  useEffect(() => {
    if (!playlist) return;

    // Reset current index when playlist changes
    setCurrentIndex(0);

    // Cleanup unused media files
    cleanupUnusedMedia(playlist);

    async function downloadAllMedia() {
      if (!hasContent){
        return;
      }

      setIsLoading(true);

      try {
        await Promise.all(
          playlist.medias.data.map(item => downloadMedia(item.media))
        );
      } catch (error) {
        console.error('Failed to download all media:', error);
      }

      setIsLoading(false);
    }

    downloadAllMedia();

    return () => {
      clearDownloads();
    };
  }, [playlist]);

  const handleMediaEnd = () => {
    if (!hasContent) return;
    setCurrentIndex((prev) => (prev + 1) % (playlist?.medias.data.length || 1));
  };

  useEffect(() => {
    if (!currentMedia) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const download = downloads[currentMedia.media.id];
    if (!download?.localUrl) return;

    if (currentMedia.media.type === 'image') {
      const duration = parseFloat(currentMedia.duration) * 1000;
      timeoutRef.current = setTimeout(handleMediaEnd, duration);
    }

    if (currentMedia.media.type === 'video' && videoRef.current) {
      videoRef.current.play();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, currentMedia, downloads]);

  if (!playlist) {
    return (
      <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500" />
          <h2 className="text-xl font-semibold text-white">No Schedule</h2>
          <p className="text-gray-400">
            There are no schedules available to display media content at the moment.
          </p>
        </div>
      </div>
    );
  }

  const renderMedia = () => {
    if (!currentMedia || isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <PlayCircle className="w-16 h-16 text-gray-600" />
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-300">
              {isLoading ? 'Loading Media...' : 'No Content Available'}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              {isLoading
                ? 'Please wait while we prepare your content'
                : 'There are no media items in this playlist'}
            </p>
          </div>
        </div>
      );
    }

    const download = downloads[currentMedia.media.id];
    if (!download?.localUrl) return null;

    if (currentMedia.media.type === 'video') {
      return (
        <video
          ref={videoRef}
          src={download.localUrl}
          className="w-full h-full object-contain"
          onEnded={handleMediaEnd}
          muted
          autoPlay
        />
      );
    }

    return (
      <img
        src={download.localUrl}
        alt={currentMedia.media.name}
        className="w-full h-full object-contain"
      />
    );
  };

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl">
      {renderMedia()}

      {isLoading && downloadStats && (
        <DownloadProgress {...downloadStats} />
      )}

      {hasContent && currentMedia && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {currentMedia.media.name}
            </span>
            <span className="text-gray-400 text-xs">
              {`${currentIndex + 1}/${playlist.medias.data.length}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
