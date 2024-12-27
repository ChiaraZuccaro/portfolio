import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Langs } from '@app/enums/languages.enum';
import { LangInterface } from '@app/interfaces/lang.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {
  private _translateService = inject(TranslateService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  public langs: LangInterface[];
  public showLangOptions: boolean;
  public selectedLang: LangInterface;

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        const lang = params['lang'];
        if(lang) {
          this.selectedLang = Langs.find(langList => langList.code === lang) ?? this.langs[0];
          this._translateService.use(this.selectedLang.code);
        }
      }
    )
  }

  public toggleLangs() {
    this.showLangOptions = !this.showLangOptions;
    this.langs = Langs.filter(lang => lang.code !== this.selectedLang.code);
  }

  public changeLang(newLang: string) {
    const currentRoute = this._route.snapshot.url.map(segment => segment.path);
    currentRoute[0] = newLang;
    this.showLangOptions = false;
    this._router.navigate(currentRoute);
  }
}
