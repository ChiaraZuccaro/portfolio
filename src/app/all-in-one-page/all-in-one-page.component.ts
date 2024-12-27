import { Component } from '@angular/core';
import { NavbarComponent } from '@app/components/navbar/navbar.component';
import { HeroComponent } from '@app/sections/hero/hero.component';

@Component({
  selector: 'all-in-one-page',
  imports: [
    NavbarComponent,
    HeroComponent
  ],
  templateUrl: './all-in-one-page.component.html',
  styleUrl: './all-in-one-page.component.scss'
})
export class AllInOnePageComponent {

}
