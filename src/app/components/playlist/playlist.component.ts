
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  imports: [CommonModule],
  template: `
    <div class="playlist-container">
      @for (item of items(); track item.id) {
        <div 
          class="video-card" 
          [class.selected]="item.id === selectedVideo()?.id" 
          (click)="selectVideo.emit(item)"
        >
          <div class="video-thumbnail">
             <img [src]="item.thumbnail" [alt]="item.title">
          </div>
          <div class="video-info">
            <h5 class="video-title">{{ item.title }}</h5>
            <p class="video-channel">SMWX</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .playlist-container {
      background-color: var(--card-background);
      border-radius: 1rem;
      padding: 0.75rem;
    }

    .video-card {
      display: flex;
      gap: 0.75rem;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;
      padding: 0.75rem;
    }

    .video-card.selected {
      background-color: var(--card-background-selected);
    }

    .video-card:hover {
      background-color: var(--card-background-hover);
    }

    .video-thumbnail img {
      width: 160px;
      height: 90px;
      object-fit: cover;
      border-radius: 0.5rem;
    }

    .video-info {
      flex: 1;
    }

    .video-title {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0;
    }

    .video-channel {
        font-size: 0.8rem;
        color: #aaa;
        margin: 0.25rem 0 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {
  public items = input.required<Episode[]>();
  public selectedVideo = input<Episode|null>(null);
  public selectVideo = output<Episode>();
}
