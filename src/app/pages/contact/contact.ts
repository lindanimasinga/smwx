
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="placeholder">
      <h1>Contact</h1>
      <p>Coming soon!</p>
    </div>
  `,
  styles: [`
    .placeholder {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400px;
      background-color: var(--card-background);
      border-radius: 1rem;
      margin: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
