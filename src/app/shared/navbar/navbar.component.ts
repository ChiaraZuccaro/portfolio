import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'navbar',
  imports: [
    RouterLink,
    TranslatePipe,
    LanguageSelectorComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private route = inject(ActivatedRoute);

  public navItems = [
    {
      label: 'NAV.HOME',
      route: '/home'
    },
    {
      label: 'NAV.EXP',
      route: '/experiences'
    },
    {
      label: 'NAV.CERTS',
      route: '/certification'
    },
    {
      label: 'NAV.CONTACTS',
      route: '/contacts'
    },
    {
      label: 'NAV.SKILLS',
      route: '/skills'
    },
    {
      label: 'NAV.RESUME',
      route: '/resume'
    }
  ]

  ngOnInit() {
    const test = this.route.url.subscribe(
      urlPath => {
        const currentPath = urlPath.map(segment => segment.path).join('/');
        // debugger
      }
    )
  }
}
