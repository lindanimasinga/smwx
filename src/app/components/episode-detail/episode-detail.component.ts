import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PlaylistItem } from '../../../models';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeDetailComponent {
  public episode = input.required<PlaylistItem>();
}
