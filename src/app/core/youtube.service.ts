
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Episode } from '../models/episode.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YouTubeDataService {
  private http = inject(HttpClient);
  private apiKey = environment.youtubeApiKey;
  private channelHandle = environment.youtubeChannelId; // This is the handle, e.g., @_SMWX

  private getChannel(): Observable<any> {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.channelHandle}&type=channel&key=${this.apiKey}`;

    return this.http.get<any>(searchUrl).pipe(
      switchMap(response => {
        if (response.items && response.items.length > 0) {
          const channelId = response.items[0].id.channelId;
          const channelDetailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelId}&key=${this.apiKey}`;
          return this.http.get<any>(channelDetailsUrl);
        } else {
          return of({ items: [] });
        }
      }),
      map(response => (response.items && response.items.length > 0) ? response.items[0] : null)
    );
  }

  getPlaylist(): Observable<Episode[]> {
    return this.getChannel().pipe(
      switchMap(channel => {
        if (!channel || !channel.contentDetails?.relatedPlaylists?.uploads) {
          return of([]);
        }
        const playlistId = channel.contentDetails.relatedPlaylists.uploads;
        const playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${this.apiKey}`;

        return this.http.get<any>(playlistItemsUrl).pipe(
          switchMap(playlistResponse => {
            if (!playlistResponse.items) {
              return of([]);
            }
            const validItems = playlistResponse.items.filter((item: any) => item.snippet?.thumbnails?.high);
            if (validItems.length === 0) {
              return of([]);
            }

            const videoIds = validItems.map((item: any) => item.snippet.resourceId.videoId).join(',');
            const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoIds}&key=${this.apiKey}`;

            return this.http.get<any>(videosUrl).pipe(
              map(videosResponse => {
                const videoDetailsMap = new Map<string, any>();
                videosResponse.items.forEach((video: any) => {
                  videoDetailsMap.set(video.id, video);
                });

                return validItems.map((item: any): Episode => {
                  const videoDetails = videoDetailsMap.get(item.snippet.resourceId.videoId);
                  return {
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    publishedAt: item.snippet.publishedAt,
                    date: item.snippet.publishedAt,
                    thumbnail: item.snippet.thumbnails.high.url,
                    link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
                    duration: videoDetails ? this.formatDuration(videoDetails.contentDetails.duration) : '00:00',
                    views: videoDetails ? parseInt(videoDetails.statistics.viewCount) : 0,
                    tags: videoDetails ? videoDetails.snippet.tags : []
                  };
                });
              })
            );
          })
        );
      })
    );
  }

  getChannelIntroduction(): Observable<string> {
    return this.getChannel().pipe(
      map(channel => {
        if (channel) {
          return channel.snippet.description;
        }
        return 'Could not load introduction.';
      })
    );
  }

  private formatDuration(duration: string): string {
    if (!duration) {
      return '00:00';
    }
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) {
      return '00:00';
    }

    const [, hoursStr, minutesStr, secondsStr] = match;
    const hours = parseInt(hoursStr || '0');
    const minutes = parseInt(minutesStr || '0');
    const seconds = parseInt(secondsStr || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }
}
