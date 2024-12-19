import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'root',
  imports: [
    RouterOutlet,
    TranslateModule
  ],
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {
  private langs = ['en', 'it'];

  constructor(private _translateService: TranslateService) {
    this._translateService.addLangs(this.langs);
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
  }
}
