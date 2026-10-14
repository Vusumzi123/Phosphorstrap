import { Component, signal } from '@angular/core';

interface TokenColor {
  name: string;
  label: string;
}

interface ReadoutEntry {
  name: string;
  value: string;
}

const COLOR_TOKENS: TokenColor[] = [
  { name: '--ph-bg', label: 'bg' },
  { name: '--ph-surface', label: 'surface' },
  { name: '--ph-surface-raised', label: 'surface-raised' },
  { name: '--ph-border', label: 'border' },
  { name: '--ph-text', label: 'text' },
  { name: '--ph-text-muted', label: 'text-muted' },
  { name: '--ph-primary', label: 'primary' },
  { name: '--ph-success', label: 'success' },
  { name: '--ph-warning', label: 'warning' },
  { name: '--ph-danger', label: 'danger' },
  { name: '--ph-info', label: 'info' },
];

const READOUT_TOKENS = [
  ...COLOR_TOKENS.map((t) => t.name),
  '--ph-font-size-base',
  '--ph-radius-sm',
  '--ph-radius-md',
  '--ph-radius-lg',
  '--ph-space-4',
  '--ph-control-height',
];

function hexToRgbTriplet(hex: string): string | null {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

@Component({
  selector: 'app-playground-page',
  templateUrl: './playground.html',
})
export class PlaygroundPage {
  private readonly root = document.documentElement;
  private readonly touched = new Set<string>();

  protected readonly colorTokens = COLOR_TOKENS;
  protected readonly initialColors: Record<string, string>;
  protected readonly initialRadiusSm: string;
  protected readonly initialRadiusMd: string;
  protected readonly initialRadiusLg: string;
  protected readonly initialBaseSize: string;
  protected readonly readout = signal<ReadoutEntry[]>([]);

  constructor() {
    const cs = getComputedStyle(this.root);
    this.initialColors = Object.fromEntries(
      COLOR_TOKENS.map((t) => [t.name, cs.getPropertyValue(t.name).trim()]),
    );
    this.initialRadiusSm = cs.getPropertyValue('--ph-radius-sm').trim();
    this.initialRadiusMd = cs.getPropertyValue('--ph-radius-md').trim();
    this.initialRadiusLg = cs.getPropertyValue('--ph-radius-lg').trim();
    this.initialBaseSize = String(
      Math.round(parseFloat(cs.getPropertyValue('--ph-font-size-base')) * 16),
    );
    this.refreshReadout();
  }

  protected onColor(name: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.apply(name, value);
    const rgb = hexToRgbTriplet(value);
    if (rgb) {
      this.apply(`${name}-rgb`, rgb);
    }
    this.refreshReadout();
  }

  protected onRadius(name: string, event: Event): void {
    this.apply(name, `${(event.target as HTMLInputElement).value}px`);
    this.refreshReadout();
  }

  protected onBaseSize(event: Event): void {
    this.apply(
      '--ph-font-size-base',
      `${(event.target as HTMLInputElement).value}px`,
    );
    this.refreshReadout();
  }

  protected reset(): void {
    for (const name of this.touched) {
      this.root.style.removeProperty(name);
    }
    this.touched.clear();
    this.refreshReadout();
  }

  private apply(name: string, value: string): void {
    this.root.style.setProperty(name, value);
    this.touched.add(name);
  }

  private refreshReadout(): void {
    const cs = getComputedStyle(this.root);
    this.readout.set(
      READOUT_TOKENS.map((name) => ({
        name,
        value: cs.getPropertyValue(name).trim(),
      })),
    );
  }
}
