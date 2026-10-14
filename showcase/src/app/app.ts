import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ThemeService } from './theme';

interface NavItem {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly nav: NavItem[] = [
    { path: '/', label: 'home', exact: true },
    { path: '/buttons', label: 'buttons' },
    { path: '/forms', label: 'forms' },
    { path: '/alerts', label: 'alerts' },
    { path: '/cards', label: 'cards' },
    { path: '/panels', label: 'panels' },
    { path: '/modals', label: 'modals' },
    { path: '/toasts', label: 'toasts' },
    { path: '/tables', label: 'tables' },
    { path: '/badges', label: 'badges' },
    { path: '/navs', label: 'navs' },
    { path: '/calendar', label: 'calendar' },
    { path: '/playground', label: 'token playground' },
    { path: '/themes', label: 'community themes' },
  ];

  constructor(protected readonly theme: ThemeService) {}
}
