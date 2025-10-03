
import { Injectable, signal, effect } from '@angular/core';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme = signal<Theme>(Theme.Light);
  public readonly currentTheme = this.theme.asReadonly();

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.setTheme(prefersDark.matches ? Theme.Dark : Theme.Light);

    prefersDark.addEventListener('change', (e) => {
      this.setTheme(e.matches ? Theme.Dark : Theme.Light);
    });

    effect(() => {
      if (this.theme() === Theme.Dark) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    });
  }

  private setTheme(theme: Theme) {
    this.theme.set(theme);
  }
}
