import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.html',
  styleUrls: ['./episode-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeDetailComponent {
  public episode = input.required<Episode>();
}
