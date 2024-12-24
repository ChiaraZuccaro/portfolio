import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';

export const routes: Routes = [
    { path: ':lang', canActivate: [LangGuard], component: HomeComponent },
    { path: '**', redirectTo: 'en', pathMatch: 'full' }
];
