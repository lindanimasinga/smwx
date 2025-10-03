
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-episode-detail',
  template: `
    <div class="episode-details">
      @if (episode()) {
        <h1 class="episode-title">{{ episode().title }}</h1>
        <div class="channel-info">
            <div class="channel-avatar"></div>
            <div class="channel-name">
                <span>SMWX</span>
                <span class="subscriber-count">1M Subscribers</span>
            </div>
            <button class="subscribe-button">Subscribe</button>
        </div>
        <div class="actions-bar">
            <div class="action-group">
                <button class="action-button"><i class="bi bi-hand-thumbs-up"></i> 10K</button>
                <button class="action-button"><i class="bi bi-hand-thumbs-down"></i></button>
            </div>
            <button class="action-button"><i class="bi bi-share"></i> Share</button>
            <button class="action-button"><i class="bi bi-download"></i> Download</button>
            <button class="action-button more-button"><i class="bi bi-three-dots"></i></button>
        </div>
        <div class="description-box">
          <p>{{ episode().description }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .episode-details {
        margin-top: 1rem;
    }
    .episode-title {
        font-size: 1.5rem;
        font-weight: 500;
    }
    .channel-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 1rem 0;
    }
    .channel-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
    }
    .channel-name {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .channel-name span:last-child {
        font-size: 0.8rem;
        color: #aaa;
    }
    .subscribe-button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-weight: 500;
    }
    .actions-bar {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    .action-group {
        display: flex;
        border: 1px solid var(--card-border-color);
        border-radius: 2rem;
    }
    .action-button {
        background-color: var(--card-background);
        color: var(--text-color);
        border: 1px solid var(--card-border-color);
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .action-group .action-button {
        border: none;
    }
    .action-group .action-button:first-child {
        border-right: 1px solid var(--card-border-color);
        border-radius: 2rem 0 0 2rem;
    }
    .action-group .action-button:last-child {
        border-radius: 0 2rem 2rem 0;
    }
    .more-button {
        border-radius: 50%;
        padding: 0.5rem;
    }
    .description-box {
        background-color: var(--card-background);
        padding: 1rem;
        border-radius: 0.5rem;
    }
  `]
})
export class EpisodeDetailComponent {
  public episode = input.required<Episode>();
}
