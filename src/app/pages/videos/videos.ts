
import { ChangeDetectionStrategy, Component, computed, inject, signal, OnInit, effect } from '@angular/core';
import { YouTubeDataService } from '../../core/youtube.service';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { EpisodeDetailComponent } from '../../components/episode-detail/episode-detail.component';
import { Episode } from '../../models/episode.model';
import { CommonModule } from '@angular/common';
import { EpisodeListComponent } from '../../components/episode-list/episode-list';
import { AdsenseModule } from 'ng2-adsense';

@Component({
  selector: 'app-videos',
  imports: [
    CommonModule, 
    VideoPlayerComponent, 
    EpisodeDetailComponent,
    EpisodeListComponent,
    AdsenseModule,
  ],
  template: `
    <main class="app-body">
        @if (latestVideo() && playlistItems().length > 0) {
            <section class="hero-section">
                <div class="video-main">
                    <app-video-player [videoId]="latestVideo()!.link.split('v=')[1]" />
                    <app-episode-detail [episode]="latestVideo()!" />
                </div>
                <div class="google-ads">
                  <ng-adsense></ng-adsense>
                </div>
            </section>
        } @else {
            <div class="placeholder">
                <p>Loading episodes...</p>
            </div>
        }

        <section class="catalog-section">
            <h2>Newest Videos</h2>
            @if (sortedByDate().length > 0) {
              <app-episode-list 
                [episodes]="sortedByDate()" 
                [selectedVideo]="latestVideo()"
                (selectEpisode)="onSelectVideo($event)"
                [layout]="'horizontal'" />
            }
        </section>

        <section class="catalog-section">
            <h2>Most Popular</h2>
            @if (sortedByViews().length > 0) {
              <app-episode-list 
                [episodes]="sortedByViews()" 
                [selectedVideo]="latestVideo()"
                (selectEpisode)="onSelectVideo($event)"
                [layout]="'horizontal'" />
            }
        </section>
        
        @for (category of categorizedVideos() | keyvalue; track category.key) {
          <section class="catalog-section">
            <h2>{{ category.key }}</h2>
            <app-episode-list
              [episodes]="category.value"
              [selectedVideo]="latestVideo()"
              (selectEpisode)="onSelectVideo($event)"
              [layout]="'grid'"
            />
          </section>
        }
    </main>
  `,
  styles: [`
    .app-body {
      padding: 2rem;
    }
    .hero-section {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 2rem;
        margin-bottom: 3rem;
    }
    .video-main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
        background-color: var(--card-background);
        border-radius: 1rem;
        margin-bottom: 3rem;
    }

    .catalog-section {
      margin-bottom: 3rem;
    }

    .catalog-section h2 {
        border-bottom: 1px solid var(--card-border-color);
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
    }

    @media (max-width: 1200px) {
        .hero-section {
            grid-template-columns: 1fr;
        }
    }
    .google-ads {
      background-color: var(--card-background);
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosComponent implements OnInit {
  private youtubeDataService = inject(YouTubeDataService);

  public playlistItems = signal<Episode[]>([]);
  public latestVideo = signal<Episode | null>(null);

  public sortedByDate = computed(() => {
    return [...this.playlistItems()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  public sortedByViews = computed(() => {
    return [...this.playlistItems()].sort((a, b) => (b.views || 0) - (a.views || 0));
  });

  public categorizedVideos = computed(() => {
    const categories: { [key: string]: Episode[] } = {};
    for (const video of this.playlistItems()) {
      for (const tag of video.tags || []) {
        if (!categories[tag]) {
          categories[tag] = [];
        }
        categories[tag].push(video);
      }
    }
    return categories;
  });

  ngOnInit() {
    this.youtubeDataService.getPlaylist().subscribe({
      next: (episodes: Episode[]) => {
        this.playlistItems.set(episodes);
        if (episodes.length > 0) {
          this.latestVideo.set(episodes[0]);
        }
      },
      error: (err: any) => {
        console.error('Error fetching YouTube playlist:', err);
        this.playlistItems.set([]);
        this.latestVideo.set(null);
      }
    });
  }

  onSelectVideo(video: Episode) {
    this.latestVideo.set(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
