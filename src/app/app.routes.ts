import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { JobsComponent } from './pages/jobs/jobs.component';

export const routes: Routes = [
    {
        path: ':lang',
        canActivate: [LangGuard],
        children: [
            { path: 'home', title: 'CZ | Portfolio', component: HomeComponent },
            { path: 'contacts', title: 'CZ | Contacts', component: ContactsComponent },
            { path: 'exp', title: 'CZ | Experiences', component: JobsComponent },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'en', pathMatch: 'full' }
];
