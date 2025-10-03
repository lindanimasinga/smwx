
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Episode, PlaylistItem } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RssService {
  private http = inject(HttpClient);

  constructor() { }

  getFeed(url: string) {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item'));
        const episodes: Episode[] = items.map(item => {
          return {
            title: item.querySelector('title')?.textContent || '',
            description: item.querySelector('description')?.textContent || '',
            pubDate: item.querySelector('pubDate')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            author: item.querySelector('author')?.textContent || '',
            thumbnail: item.querySelector('media\\:thumbnail')?.getAttribute('url') || '',
            videoId: item.querySelector('yt\\:videoId')?.textContent || ''
          };
        });

        const playlistItems: PlaylistItem[] = episodes.map(episode => {
          return {
            title: episode.title,
            videoId: episode.videoId,
            thumbnailUrl: episode.thumbnail,
            description: episode.description
          }
        })
        return { episodes, playlistItems };
      })
    );
  }
}
