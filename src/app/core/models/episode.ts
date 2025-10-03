
export interface Episode {
  id: string;              // YouTube videoId
  title: string;
  description: string;
  publishedAt: string;     // ISO
  thumbnail: string;       // URL
  link: string;            // watch URL
  duration?: string;       // ISO 8601 if from YouTube API
  tags?: string[];         // optional client tags
  guestNames?: string[];   // parsed heuristically (Phase 2)
}

export interface PlaylistItem extends Episode { playlistId: string; }
