import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgGridModule } from 'ag-grid-angular';

import { VesselsEffects, vesselsReducer } from '@angular-monorepo/data-access';

import { VesselsViewComponent } from './vessels-view/vessels-view.component';


const routes: Routes = [
    {
        path: '',
        component: VesselsViewComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgGridModule,
        StoreModule.forFeature('vessels', vesselsReducer),
        EffectsModule.forFeature([VesselsEffects]),
    ],
    declarations: [
        VesselsViewComponent,
    ],
    exports: [
        RouterModule,
    ],
})
export class FeatureVesselsModule { }
