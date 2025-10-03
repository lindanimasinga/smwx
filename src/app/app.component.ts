import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { RssService } from './core/rss.service';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { PlaylistItem } from '../models';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <h1 class="text-center my-4">SMWX</h1>
      <div class="row">
        <div class="col-md-8">
          @if (selectedVideo()) {
            <app-video-player [videoId]="selectedVideo()!.videoId" />
            <app-episode-detail [episode]="selectedVideo()!" />
          } @else {
            <p class="text-center">Select a video to play</p>
          }
        </div>
        <div class="col-md-4">
          <app-playlist [items]="playlistItems()" (selectVideo)="onSelectVideo($event)" />
        </div>
      </div>
    </div>
  `,
  imports: [VideoPlayerComponent, PlaylistComponent, EpisodeDetailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private rssService = inject(RssService);

  public playlistItems = signal<PlaylistItem[]>([]);
  public selectedVideo = signal<PlaylistItem | null>(null);

  // YouTube Channel RSS feed URL for SMWX
  private feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC0p5jTq6_02nL2b_g66vXg';

  ngOnInit() {
    this.rssService.getFeed(this.feedUrl).subscribe({
      next: ({ playlistItems }) => {
        this.playlistItems.set(playlistItems);
        if (playlistItems.length > 0) {
          this.selectedVideo.set(playlistItems[0]);
        }
      },
      error: (err) => {
        console.error('Error fetching RSS feed:', err);
        this.playlistItems.set([]);
        this.selectedVideo.set(null);
      }
    });
  }

  onSelectVideo(video: PlaylistItem) {
    this.selectedVideo.set(video);
  }
}
