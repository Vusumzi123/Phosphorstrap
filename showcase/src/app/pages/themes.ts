import { Component } from '@angular/core';

import { ThemeService } from '../theme';

@Component({
  selector: 'app-themes-page',
  templateUrl: './themes.html',
})
export class ThemesPage {
  constructor(private readonly theme: ThemeService) {}

  protected activate(id: 'dark' | 'light' | 'green-crt'): void {
    this.theme.set(id);
  }

  protected isActive(id: 'dark' | 'light' | 'green-crt'): boolean {
    return this.theme.current() === id;
  }
}
