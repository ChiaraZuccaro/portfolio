import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  imports: [ TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private route = inject(ActivatedRoute);

  public navItems = [
    {
      label: 'NAV.HOME',
      route: 'hero'
    },
    {
      label: 'NAV.ABOUT',
      route: 'about-me'
    },
    {
      label: 'NAV.SKILLS',
      route: 'skills'
    },
    {
      label: 'NAV.EXP',
      route: 'jobs'
    },
    {
      label: 'NAV.CONTACTS',
      route: 'contacts'
    },
    {
      label: 'NAV.RESUME',
      route: 'resume'
    }
  ]

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
