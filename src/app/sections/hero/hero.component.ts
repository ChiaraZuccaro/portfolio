import { Component } from '@angular/core';
import { Technologies } from '@app/data/techs.mock';

@Component({
  selector: 'hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  public techs = Technologies;
}
