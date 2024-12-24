import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';

export const routes: Routes = [
    { 
        path: ':lang',
        canActivate: [LangGuard],
        children: [
            {
                path: 'home',
                title: 'CZ | Portfolio',
                component: HomeComponent
            },
            // { path: ':contacts'},
            // { path: ':skills'},
            // { path: ':certifications'},
            // { path: ':jobs'},
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'en', pathMatch: 'full' }
];