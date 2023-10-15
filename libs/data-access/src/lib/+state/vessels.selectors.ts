import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VesselsState } from './vessels.reducer';


const getVesselsState = createFeatureSelector<VesselsState>('vessels');

const getAllVessels = createSelector(getVesselsState, (state: VesselsState) => {
    return state.vesselsLoaded ? state.vessels : [];
});

const getEmissionsForSelectedVessel = createSelector(getVesselsState, (state: VesselsState) => {
    if (!state.emissionsLoaded || !state.vesselsLoaded) return [];
    return state.emissions.find((emissionReport) => emissionReport.id === state.selectedId)?.timeSeries || [];
});

const getAllVesselsWithEmissionData = createSelector(getVesselsState, (state: VesselsState) => {
    if (!state.emissionsLoaded || !state.vesselsLoaded) return [];
    return state.vessels.filter((vessel) => state.emissions?.map((emission) => emission.id).includes(vessel.id)) || [];
});

export const vesselsQuery = {
    getAllVessels,
    getEmissionsForSelectedVessel,
    getAllVesselsWithEmissionData,
};
