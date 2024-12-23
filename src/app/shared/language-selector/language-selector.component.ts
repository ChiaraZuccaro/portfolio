import { Component, inject } from '@angular/core';
import { Langs } from '@app/enums/languages.enum';
import { LangInterface } from '@app/interfaces/lang.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  private _translateService = inject(TranslateService);

  public langs = Langs;
  public showLangOptions: boolean;
  public selectedLang: LangInterface;

  public changeLang(lang: string) {
    this.selectedLang = this.langs.find(langListed => langListed.code === lang) ?? this.langs[0];
    this.showLangOptions = false;
    this._translateService.use(this.selectedLang.code);
  }
}
