import { Component } from '@angular/core';

import { ThemeService } from '../theme';

@Component({
  selector: 'app-themes-page',
  templateUrl: './themes.html',
})
export class ThemesPage {
  constructor(private readonly theme: ThemeService) {}

  protected activate(id: 'dark' | 'light' | 'green-crt' | 'nibble' | 'nibble-light'): void {
    this.theme.set(id);
  }

  protected isActive(id: 'dark' | 'light' | 'green-crt' | 'nibble' | 'nibble-light'): boolean {
    return this.theme.current() === id;
  }
}
