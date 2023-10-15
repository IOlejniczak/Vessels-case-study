import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Emission, Vessel } from '../api-models';


export const fromVesselsActions = createActionGroup({
    source: 'Vessels',
    events: {
        loadVessels: emptyProps(),
        vesselsLoaded: props<{ payload: Vessel[] }>(),
        loadEmissions: emptyProps(),
        emissionsLoaded: props<{ payload: Emission[] }>(),
        selectVesselId: props<{ id: number }>(),
    },
});
