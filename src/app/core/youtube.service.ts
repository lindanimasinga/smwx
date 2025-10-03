import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from '../models/episode.model';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class YouTubeDataService {
  private http = inject(HttpClient);

  getPlaylist(): Observable<Episode[]> {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${config.playlistId}&maxResults=50&key=${config.apiKey}`;

    return this.http.get<any>(url).pipe(
      map(response => response.items.map((item: any): Episode => ({
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        duration: this.formatDuration(item.contentDetails.duration)
      })))
    );
  }

  private formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (!match) {
      return '00:00';
    }

    const hours = (parseInt(match[1] || '0') || 0);
    const minutes = (parseInt(match[2] || '0') || 0);
    const seconds = (parseInt(match[3] || '0') || 0);

    let result = '';

    if (hours > 0) {
      result += `${hours}:`;
    }

    result += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return result;
  }
}
