import { Component } from '@angular/core';
import { Technologies } from '@app/data/techs.mock';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'hero',
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  public techs = Technologies;
}
