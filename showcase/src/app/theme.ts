import { Injectable, signal } from '@angular/core';

export type ThemeId = 'dark' | 'light' | 'green-crt';

export interface ThemeEntry {
  id: ThemeId;
  label: string;
  note: string;
}

export const THEMES: ThemeEntry[] = [
  { id: 'dark', label: 'dark', note: 'built-in — src/themes/dark.css' },
  { id: 'light', label: 'light', note: 'built-in — :root default in src/tokens.css' },
  { id: 'green-crt', label: 'green-crt', note: 'community drop-in — themes/green-crt.css' },
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
    this.set(this.current() === 'dark' ? 'light' : 'dark');
  }
}
