
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  imports: [CommonModule],
  template: `
    <ul class="list-group">
      @for (item of items(); track item.url) {
        <li class="list-group-item" (click)="selectVideo.emit(item)">
          <img [src]="item.thumbnail" [alt]="item.title" class="img-thumbnail" width="120">
          {{ item.title }}
        </li>
      }
    </ul>
  `,
  styles: [`
    .list-group-item {
      cursor: pointer;
    }
    .list-group-item:hover {
      background-color: #eee;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {
  public items = input.required<Episode[]>();
  public selectVideo = output<Episode>();
}
