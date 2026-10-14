import { Component } from '@angular/core';

@Component({
  selector: 'app-toasts-page',
  templateUrl: './toasts.html',
})
export class ToastsPage {
  protected showToast(element: HTMLElement): void {
    const bootstrap = (window as unknown as { bootstrap?: { Toast: { getOrCreateInstance: (el: HTMLElement) => { show: () => void } } } }).bootstrap;
    bootstrap?.Toast.getOrCreateInstance(element).show();
  }
}
