import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  signal,
} from '@angular/core';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

let instanceCount = 0;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isoOf(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseIso(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return Number.isNaN(d.getTime()) ? null : startOfDay(d);
}

interface DayCell {
  date: Date;
  iso: string;
  outside: boolean;
  today: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
})
export class CalendarComponent {
  protected readonly popoverId = `ph-cal-popover-${++instanceCount}`;

  protected readonly open = signal(false);
  protected readonly view = signal<Date>(startOfDay(new Date()));
  protected readonly selected = signal<Date | null>(startOfDay(new Date()));
  protected readonly inputValue = signal(isoOf(startOfDay(new Date())));
  protected readonly focusDate = signal<Date>(startOfDay(new Date()));

  @ViewChild('inputEl') private inputEl?: ElementRef<HTMLInputElement>;
  private readonly host: ElementRef<HTMLElement>;

  constructor(host: ElementRef<HTMLElement>) {
    this.host = host;
  }

  protected readonly title = computed(() => {
    const v = this.view();
    return `${MONTHS[v.getMonth()]} ${v.getFullYear()}`;
  });

  protected readonly weeks = computed<DayCell[][]>(() => {
    const view = this.view();
    const y = view.getFullYear();
    const m = view.getMonth();
    const first = new Date(y, m, 1);
    const start = new Date(y, m, 1 - first.getDay());
    const todayIso = isoOf(startOfDay(new Date()));
    const selectedDate = this.selected();
    const selectedIso = selectedDate ? isoOf(selectedDate) : null;
    const weeks: DayCell[][] = [];
    let d = start;
    for (let w = 0; w < 6; w++) {
      const week: DayCell[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const iso = isoOf(date);
        week.push({
          date,
          iso,
          outside: date.getMonth() !== m,
          today: iso === todayIso,
          selected: iso === selectedIso,
        });
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  });

  private readonly flatDays = computed(() => this.weeks().flat());

  protected isTabbable(day: DayCell): boolean {
    return day.iso === isoOf(this.focusDate());
  }

  protected toggleCal(): void {
    if (this.open()) {
      this.closeCal();
    } else {
      this.openCal();
    }
  }

  protected openCal(): void {
    this.open.set(true);
    this.clampFocus();
    this.focusDayIso(isoOf(this.focusDate()));
  }

  protected closeCal(refocus = true): void {
    this.open.set(false);
    if (refocus) {
      this.inputEl?.nativeElement.focus();
    }
  }

  protected stepMonth(delta: number): void {
    const v = this.view();
    this.view.set(new Date(v.getFullYear(), v.getMonth() + delta, 1));
    this.clampFocus();
    if (this.open()) {
      this.focusDayIso(isoOf(this.focusDate()));
    }
  }

  protected pick(date: Date): void {
    const d = startOfDay(date);
    this.selected.set(d);
    this.view.set(new Date(d.getFullYear(), d.getMonth(), 1));
    this.inputValue.set(isoOf(d));
    this.focusDate.set(d);
    this.closeCal();
  }

  protected pickToday(): void {
    this.pick(new Date());
  }

  protected clear(): void {
    this.selected.set(null);
    this.inputValue.set('');
    this.inputEl?.nativeElement.focus();
  }

  protected onInputValue(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  protected onInputChange(): void {
    const d = parseIso(this.inputValue());
    if (d) {
      this.selected.set(d);
      this.view.set(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }

  protected onInputClick(): void {
    if (!this.open()) {
      this.openCal();
    }
  }

  protected onInputKeydown(event: Event): void {
    const e = event as KeyboardEvent;
    if (e.key === 'Escape') {
      this.closeCal(false);
      return;
    }
    if (e.key === 'ArrowDown' && !this.open()) {
      e.preventDefault();
      this.openCal();
      return;
    }
    if (e.key === 'Enter') {
      const d = parseIso(this.inputValue());
      if (d) {
        e.preventDefault();
        this.pick(d);
      } else if (!this.open()) {
        e.preventDefault();
        this.openCal();
      }
    }
  }

  protected onDayKey(event: Event, day: DayCell): void {
    const e = event as KeyboardEvent;
    const days = this.flatDays();
    const i = days.findIndex((d) => d.iso === day.iso);
    switch (e.key) {
      case 'ArrowLeft': e.preventDefault(); this.moveFocus(i - 1); break;
      case 'ArrowRight': e.preventDefault(); this.moveFocus(i + 1); break;
      case 'ArrowUp': e.preventDefault(); this.moveFocus(i - 7); break;
      case 'ArrowDown': e.preventDefault(); this.moveFocus(i + 7); break;
      case 'Home': e.preventDefault(); this.moveFocus(i - (i % 7)); break;
      case 'End': e.preventDefault(); this.moveFocus(i + (6 - (i % 7))); break;
      case 'PageUp': e.preventDefault(); this.stepMonth(-1); break;
      case 'PageDown': e.preventDefault(); this.stepMonth(1); break;
      case 'Escape': e.preventDefault(); this.closeCal(); break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.pick(day.date);
        break;
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  protected onDocumentPointerDown(event: Event): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.closeCal(false);
    }
  }

  private moveFocus(index: number): void {
    const target = this.flatDays()[index];
    if (!target) return;
    this.focusDate.set(target.date);
    this.focusDayIso(target.iso);
  }

  private clampFocus(): void {
    const days = this.flatDays();
    const current = isoOf(this.focusDate());
    if (days.some((d) => d.iso === current)) return;
    const selectedDate = this.selected();
    const selectedIso = selectedDate ? isoOf(selectedDate) : null;
    const todayIso = isoOf(startOfDay(new Date()));
    const next =
      days.find((d) => d.iso === selectedIso) ??
      days.find((d) => d.iso === todayIso) ??
      days[0];
    if (next) {
      this.focusDate.set(next.date);
    }
  }

  private focusDayIso(iso: string): void {
    setTimeout(() => {
      this.host.nativeElement
        .querySelector<HTMLElement>(`.ph-calendar__day[data-iso="${iso}"]`)
        ?.focus();
    });
  }
}
