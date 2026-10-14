import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class HomePage {
  protected readonly components = [
    { path: '/buttons', label: 'buttons', markup: '.btn' },
    { path: '/forms', label: 'forms', markup: '.form-control' },
    { path: '/alerts', label: 'alerts', markup: '.alert' },
    { path: '/cards', label: 'cards', markup: '.card' },
    { path: '/panels', label: 'panels', markup: '.ph-panel' },
    { path: '/modals', label: 'modals', markup: '.modal' },
    { path: '/toasts', label: 'toasts', markup: '.toast' },
    { path: '/tables', label: 'tables', markup: '.table' },
    { path: '/badges', label: 'badges', markup: '.badge' },
    { path: '/navs', label: 'navs', markup: '.nav-tabs' },
    { path: '/calendar', label: 'calendar', markup: '.ph-calendar' },
  ];
}
