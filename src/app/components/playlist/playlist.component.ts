
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PlaylistItem } from '../../../models';

@Component({
  selector: 'app-playlist',
  template: `
    <ul class="list-group">
      @for (item of items(); track item.videoId) {
        <li class="list-group-item" (click)="selectVideo.emit(item)">
          <img [src]="item.thumbnailUrl" [alt]="item.title" class="img-thumbnail" width="120">
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
  public items = input.required<PlaylistItem[]>();
  public selectVideo = output<PlaylistItem>();
}
