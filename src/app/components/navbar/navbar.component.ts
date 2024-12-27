import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  imports: [ TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private route = inject(ActivatedRoute);

  public navItems = [
    {
      label: 'NAV.HOME',
      route: '#hero'
    },
    {
      label: 'NAV.ABOUT',
      route: '#about'
    },
    {
      label: 'NAV.SKILLS',
      route: '#skills'
    },
    {
      label: 'NAV.EXP',
      route: '#jobs'
    },
    {
      label: 'NAV.CONTACTS',
      route: '#contacts'
    },
    {
      label: 'NAV.RESUME',
      route: '#resume'
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
