
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-container">
      <input 
        type="text" 
        placeholder="Search episodes..." 
        (input)="onSearch($event)" 
      />
    </div>
  `,
  styles: [`
    .search-container input {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--card-border-color);
      background-color: var(--card-background);
      color: var(--text-color);
      font-size: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  public search = output<string>();

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.search.emit(query);
  }
}
