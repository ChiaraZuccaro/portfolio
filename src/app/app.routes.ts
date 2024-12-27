import { Routes } from '@angular/router';
import { LangGuard } from './guards/lang.guard';
import { AllInOnePageComponent } from './all-in-one-page/all-in-one-page.component';

export const routes: Routes = [
    {
        path: ':lang',
        canActivate: [LangGuard],
        component: AllInOnePageComponent
    },
    { path: '**', redirectTo: 'en', pathMatch: 'full' }
];
