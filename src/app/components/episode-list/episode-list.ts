
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-list',
  imports: [CommonModule],
  template: `
    <div [class]="layout() === 'horizontal' ? 'episode-scroll' : 'episode-grid'">
      @for (episode of episodes(); track episode.id) {
        <div 
          class="episode-card" 
          [class.selected]="episode.id === selectedVideo()?.id" 
          (click)="selectEpisode.emit(episode)"
        >
            <img [src]="episode.thumbnail" [alt]="episode.title">
            <div class="episode-info">
                <h3>{{ episode.title }}</h3>
                <div class="video-metadata">
                  <span>{{ episode.views | number }} views</span>
                  <span>{{ episode.date | date:'shortDate' }}</span>
                </div>
            </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .episode-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }
    .episode-scroll {
      display: flex;
      overflow-x: auto;
      gap: 1.5rem;
      padding: 1rem 0;
      scrollbar-width: thin;
      scrollbar-color: var(--primary-color) var(--card-background);
    }
    .episode-scroll .episode-card {
      min-width: 280px;
    }
    .episode-card {
        background-color: var(--card-background);
        border-radius: 0.5rem;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s ease-in-out, background-color 0.2s ease;
        border: 1px solid var(--card-border-color);
    }
    .episode-card:hover {
        transform: translateY(-5px);
        background-color: var(--card-background-hover);
    }
    .episode-card.selected {
        background-color: var(--card-background-selected);
        border-color: var(--primary-color);
    }
    .episode-card img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
    .episode-info {
        padding: 1rem;
    }
    .episode-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .video-metadata {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-color-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeListComponent {
  public episodes = input.required<Episode[]>();
  public selectedVideo = input<Episode|null>(null);
  public layout = input<'grid' | 'horizontal'>('grid');
  public selectEpisode = output<Episode>();
}
