
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SearchComponent, RouterLink],
  template: `
    <header class="app-header">
      <div class="start-section">
        <i class="bi bi-youtube logo-icon"></i>
        <span class="logo-text">SMWX</span>
      </div>
      <nav class="center-section">
        <a routerLink="/videos">Videos</a>
        <a routerLink="/shop">Shop</a>
        <a routerLink="/sponsors">Sponsors</a>
        <a routerLink="/contact">Contact</a>
      </nav>
      <div class="end-section">
        <app-search (search)="search.emit($event)" />
        <i class="bi bi-camera-video"></i>
        <i class="bi bi-bell"></i>
        <i class="bi bi-person-circle"></i>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1.5rem;
        background-color: var(--card-background);
        border-bottom: 1px solid var(--card-border-color);
    }

    .start-section, .end-section {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .center-section {
        flex: 1;
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    .center-section a {
        text-decoration: none;
        color: var(--text-color);
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: background-color 0.2s ease;
    }

    .center-section a:hover {
        background-color: var(--card-hover-background);
    }

    .logo-icon {
        color: var(--primary-color);
        font-size: 2rem;
    }

    .logo-text {
        font-weight: bold;
        font-size: 1.25rem;
        letter-spacing: -1px;
    }
    
    .end-section i {
        font-size: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public search = output<string>();
}
