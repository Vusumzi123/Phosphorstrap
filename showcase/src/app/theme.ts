import { Injectable, signal } from '@angular/core';

export type ThemeId = 'dark' | 'light' | 'green-crt' | 'nibble' | 'nibble-light';

export interface ThemeEntry {
  id: ThemeId;
  label: string;
  note: string;
}

export const THEMES: ThemeEntry[] = [
  { id: 'dark', label: 'dark', note: 'built-in — src/themes/dark.css' },
  { id: 'light', label: 'light', note: 'built-in — :root default in src/tokens.css' },
  { id: 'green-crt', label: 'green-crt', note: 'community drop-in — themes/green-crt.css' },
  { id: 'nibble', label: 'nibble', note: 'extended drop-in, dark — themes/nibble.css' },
  { id: 'nibble-light', label: 'nibble-light', note: 'extended drop-in, light — themes/nibble.css' },
];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes = THEMES;
  readonly current = signal<ThemeId>('dark');

  set(id: ThemeId): void {
    document.documentElement.dataset['theme'] = id;
    this.current.set(id);
  }

  toggle(): void {
    if (this.current() === 'nibble') {
      this.set('nibble-light');
    } else if (this.current() === 'nibble-light') {
      this.set('nibble');
    } else {
      this.set(this.current() === 'dark' ? 'light' : 'dark');
    }
  }
}
