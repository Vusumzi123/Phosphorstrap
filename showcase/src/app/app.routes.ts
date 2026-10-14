import { Routes } from '@angular/router';

import { AlertsPage } from './pages/alerts';
import { BadgesPage } from './pages/badges';
import { ButtonsPage } from './pages/buttons';
import { CalendarPage } from './pages/calendar';
import { CardsPage } from './pages/cards';
import { FormsPage } from './pages/forms';
import { HomePage } from './pages/home';
import { ModalsPage } from './pages/modals';
import { NavsPage } from './pages/navs';
import { PanelsPage } from './pages/panels';
import { PlaygroundPage } from './pages/playground';
import { TablesPage } from './pages/tables';
import { ThemesPage } from './pages/themes';
import { ToastsPage } from './pages/toasts';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Phosphor — Angular showcase' },
  { path: 'buttons', component: ButtonsPage, title: 'Buttons — Phosphor' },
  { path: 'forms', component: FormsPage, title: 'Forms — Phosphor' },
  { path: 'alerts', component: AlertsPage, title: 'Alerts — Phosphor' },
  { path: 'cards', component: CardsPage, title: 'Cards — Phosphor' },
  { path: 'panels', component: PanelsPage, title: 'Panels — Phosphor' },
  { path: 'modals', component: ModalsPage, title: 'Modals — Phosphor' },
  { path: 'toasts', component: ToastsPage, title: 'Toasts — Phosphor' },
  { path: 'tables', component: TablesPage, title: 'Tables — Phosphor' },
  { path: 'badges', component: BadgesPage, title: 'Badges — Phosphor' },
  { path: 'navs', component: NavsPage, title: 'Navs — Phosphor' },
  { path: 'calendar', component: CalendarPage, title: 'Calendar — Phosphor' },
  { path: 'playground', component: PlaygroundPage, title: 'Token playground — Phosphor' },
  { path: 'themes', component: ThemesPage, title: 'Community themes — Phosphor' },
  { path: '**', redirectTo: '' },
];
