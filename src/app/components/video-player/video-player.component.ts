
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="video-container">
      <iframe [src]="videoUrl()" frameborder="0" allowfullscreen></iframe>
    </div>
  `,
  styles: [`
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }

    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent {
  public videoId = input.required<string>();
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  public videoUrl = () => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId()}`);
  }
}
