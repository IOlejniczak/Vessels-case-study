import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@angular-monorepo/ui';

import { HomeViewComponent } from './home-view/home-view.component';

const routes: Routes = [
    {
        path: '',
        component: HomeViewComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UiModule,
    ],
    declarations: [
        HomeViewComponent
    ],
    exports: [
        RouterModule
    ],
})
export class FeatureHomeModule {}
