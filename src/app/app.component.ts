import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeLang = this.translocoService.getActiveLang();

  constructor(private translocoService: TranslocoService) {}

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
    this.activeLang = lang;
  }
}
