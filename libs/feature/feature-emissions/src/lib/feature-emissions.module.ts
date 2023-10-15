import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';

import { VesselsEffects, vesselsReducer } from '@angular-monorepo/data-access';

import { EmissionsViewComponent } from './emissions-view/emissions-view.component';


const routes: Routes = [
    {
        path: '',
        component: EmissionsViewComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        HighchartsChartModule,
        StoreModule.forFeature('vessels', vesselsReducer),
        EffectsModule.forFeature([VesselsEffects]),
    ],
    declarations: [
        EmissionsViewComponent,
    ],
    exports: [
        RouterModule,
    ]
})
export class FeatureEmissionsModule { }
