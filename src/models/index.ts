export interface Episode {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  author: string;
  thumbnail: string;
  videoId: string;
}

export interface PlaylistItem {
  title: string;
  videoId: string;
  thumbnailUrl: string;
  description: string;
}
