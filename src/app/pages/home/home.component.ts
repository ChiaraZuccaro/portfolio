import { Component } from '@angular/core';
import { LanguageSelectorComponent } from '@shared/language-selector/language-selector.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NavbarComponent } from '@app/shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
