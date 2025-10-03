import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.html',
  styleUrls: ['./playlist.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {
  public items = input.required<Episode[]>();
  public selectVideo = output<Episode>();
}
