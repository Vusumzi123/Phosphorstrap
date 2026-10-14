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
  { path: '', component: HomePage, title: 'Phosphorstrap — Angular showcase' },
  { path: 'buttons', component: ButtonsPage, title: 'Buttons — Phosphorstrap' },
  { path: 'forms', component: FormsPage, title: 'Forms — Phosphorstrap' },
  { path: 'alerts', component: AlertsPage, title: 'Alerts — Phosphorstrap' },
  { path: 'cards', component: CardsPage, title: 'Cards — Phosphorstrap' },
  { path: 'panels', component: PanelsPage, title: 'Panels — Phosphorstrap' },
  { path: 'modals', component: ModalsPage, title: 'Modals — Phosphorstrap' },
  { path: 'toasts', component: ToastsPage, title: 'Toasts — Phosphorstrap' },
  { path: 'tables', component: TablesPage, title: 'Tables — Phosphorstrap' },
  { path: 'badges', component: BadgesPage, title: 'Badges — Phosphorstrap' },
  { path: 'navs', component: NavsPage, title: 'Navs — Phosphorstrap' },
  { path: 'calendar', component: CalendarPage, title: 'Calendar — Phosphorstrap' },
  { path: 'playground', component: PlaygroundPage, title: 'Token playground — Phosphorstrap' },
  { path: 'themes', component: ThemesPage, title: 'Community themes — Phosphorstrap' },
  { path: '**', redirectTo: '' },
];
