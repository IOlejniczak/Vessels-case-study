import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: 'vessels', loadChildren: () => import('@angular-monorepo/feature/feature-vessels').then(m => m.FeatureVesselsModule) },
    { path: 'emissions', loadChildren: () => import('@angular-monorepo/feature/feature-emissions').then(m => m.FeatureEmissionsModule) },
    { path: 'home', loadChildren: () => import('@angular-monorepo/feature/feature-home').then(m => m.FeatureHomeModule) },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path:'**', redirectTo: '/home' },
];
