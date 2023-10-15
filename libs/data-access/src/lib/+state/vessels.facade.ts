import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { VesselsState } from './vessels.reducer';
import { vesselsQuery } from './vessels.selectors';
import { fromVesselsActions } from './vessels.actions';
import { EmissionReport, Vessel } from '../api-models';


@Injectable()
export class VesselsFacade {
    private areVesselsLoaded = false;
    private areEmissionsLoaded = false;

    constructor(private store: Store<VesselsState>) { }

    get allVessels$(): Observable<Vessel[]> {
        this.assertVesselsLoaded();
        return this.store.select(vesselsQuery.getAllVessels);
    }

    get emissionsForVessel$(): Observable<EmissionReport[]> {
        this.assertVesselsAndEmissionsLoaded();
        return this.store.select(vesselsQuery.getEmissionsForSelectedVessel);
    }

    get vesselsWithEmission$(): Observable<Vessel[]> {
        this.assertVesselsAndEmissionsLoaded();
        return this.store.select(vesselsQuery.getAllVesselsWithEmissionData);
    }

    selectedVesselById(id: number): void {
        this.assertVesselsAndEmissionsLoaded();
        this.store.dispatch(fromVesselsActions.selectVesselId({ id }));
    }

    private assertEmissionsLoaded(): void {
        if (!this.areEmissionsLoaded) {
            this.store.dispatch(fromVesselsActions.loadEmissions());
            this.areVesselsLoaded = true;
        }
    }

    private assertVesselsAndEmissionsLoaded(): void {
        this.assertVesselsLoaded();
        this.assertEmissionsLoaded();
    }

    private assertVesselsLoaded(): void {
        if (!this.areVesselsLoaded) {
            this.store.dispatch(fromVesselsActions.loadVessels());
            this.areVesselsLoaded = true;
        }
    }
}
