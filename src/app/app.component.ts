import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Langs } from './enums/languages.enum';

@Component({
  selector: 'root',
  imports: [
    RouterOutlet,
    TranslateModule
  ],
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {
  private langs = Langs.map(lang => lang.code);

  constructor(
    private _translateService: TranslateService
  ) { this.configTranslations() }
  
  private configTranslations() {
    this._translateService.addLangs(this.langs);
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
  }
}
