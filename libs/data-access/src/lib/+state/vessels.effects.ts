import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

import { fromVesselsActions } from './vessels.actions';
import { DataAccessService } from '../data-access.service';
import { Emission, Vessel } from '../api-models';


@Injectable()
export class VesselsEffects {
    loadVessels$ = createEffect(() => this.actions$.pipe(
        ofType(fromVesselsActions.loadVessels),
        exhaustMap(() => this.dataAccess.getVessels()
            .pipe(
                map((vessels: Vessel[]) => ({ type: fromVesselsActions.vesselsLoaded.type, payload: vessels })),
                catchError(() => EMPTY),
            ),
        ),
    ));

    loadEmissions$ = createEffect(() => this.actions$.pipe(
        ofType(fromVesselsActions.loadEmissions),
        exhaustMap(() => this.dataAccess.getEmissions()
            .pipe(
                map((emissions: Emission[]) => ({ type: fromVesselsActions.emissionsLoaded.type, payload: emissions })),
                catchError(() => EMPTY),
            ),
        ),
    ));

    constructor(
        private actions$: Actions,
        private dataAccess: DataAccessService,
    ) {}
}
