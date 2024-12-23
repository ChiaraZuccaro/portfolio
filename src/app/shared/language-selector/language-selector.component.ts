import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  private _translateService = inject(TranslateService);

  public changeLang(event: Event) {
    const langSelected = (event.target as HTMLSelectElement).value;
    this._translateService.use(langSelected);
  }
}
