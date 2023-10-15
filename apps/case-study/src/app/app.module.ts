import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { NavBarComponent } from './layout-components/nav-bar/nav-bar.component';
import { DataAccessModule } from '@angular-monorepo/data-access';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        DataAccessModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
