import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { YouTubeDataService } from './core/youtube.service';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { Episode } from './models/episode.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, VideoPlayerComponent, PlaylistComponent, EpisodeDetailComponent, FooterComponent],
  template: `
    <app-header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          @if (selectedVideo()) {
            <app-video-player [videoId]="selectedVideo()!.url.split('v=')[1]" />
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
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private youtubeDataService = inject(YouTubeDataService);

  public playlistItems = signal<Episode[]>([]);
  public selectedVideo = signal<Episode | null>(null);

  ngOnInit() {
    this.youtubeDataService.getPlaylist().subscribe({
      next: (episodes: Episode[]) => {
        this.playlistItems.set(episodes);
        if (episodes.length > 0) {
          this.selectedVideo.set(episodes[0]);
        }
      },
      error: (err: any) => {
        console.error('Error fetching YouTube playlist:', err);
        this.playlistItems.set([]);
        this.selectedVideo.set(null);
      }
    });
  }

  onSelectVideo(video: Episode) {
    this.selectedVideo.set(video);
  }
}
