import { Component } from '@angular/core';
import { NavbarComponent } from '@app/components/navbar/navbar.component';
import { AboutMeComponent } from '@app/sections/about-me/about-me.component';
import { ContactsComponent } from '@app/sections/contacts/contacts.component';
import { HeroComponent } from '@app/sections/hero/hero.component';
import { JobsComponent } from '@app/sections/jobs/jobs.component';
import { SkillsComponent } from '@app/sections/skills/skills.component';

@Component({
  selector: 'all-in-one-page',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutMeComponent,
    SkillsComponent,
    JobsComponent,
    ContactsComponent
  ],
  templateUrl: './all-in-one-page.component.html',
  styleUrl: './all-in-one-page.component.scss'
})
export class AllInOnePageComponent {

}
