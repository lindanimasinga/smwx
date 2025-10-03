
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-introduction',
  template: `
    <div class="introduction">
      <h2>About SMWX</h2>
      <p>{{ text() }}</p>
    </div>
  `,
  styles: [`
    .introduction {
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionComponent {
  public text = input.required<string>();
}
