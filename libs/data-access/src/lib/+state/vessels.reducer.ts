import { createReducer, on } from '@ngrx/store';

import { fromVesselsActions } from './vessels.actions';
import { Emission, Vessel } from '../api-models';


export interface VesselsState {
    emissionsLoaded: boolean;
    vesselsLoaded: boolean;
    emissions: Emission[];
    vessels: Vessel[];
    selectedId?: number;
    error?: object;
}

export const initialState: VesselsState = {
    vessels: [],
    emissions: [],
    vesselsLoaded: false,
    emissionsLoaded: false,
};

export const vesselsReducer = createReducer(
    initialState,
    on(fromVesselsActions.vesselsLoaded, (state, { payload }) => ({
        ...state,
        vessels: payload,
        vesselsLoaded: true,
    })),
    on(fromVesselsActions.emissionsLoaded, (state, { payload }) => ({
        ...state,
        emissions: payload,
        emissionsLoaded: true,
    })),
    on(fromVesselsActions.selectVesselId, (state, { id }) => ({
        ...state,
        selectedId: id,
    })),
);
