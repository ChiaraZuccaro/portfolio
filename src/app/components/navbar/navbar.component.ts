import { Component } from '@angular/core';
import { NavItems } from '@app/data/nav-items';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  imports: [ TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public navItems = NavItems;

  public scrollToElement(idSection: string) {
    const navHeight = document.querySelector('header').clientHeight || 0;
    const element = document.getElementById(idSection);
    if(element) {
      const heightToScrollInto = idSection === 'hero' ? 0 : element.offsetTop - navHeight;
      window.scrollTo({
        top: heightToScrollInto,
        behavior: 'smooth'
      })
    }
  }
}
