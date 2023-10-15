export interface Vessel {
    active: boolean;
    companyId: number;
    id: number;
    imo: number;
    mmsi: number;
    companyName: string;
    name: string;
    startDate: string;
    vesselType: string;
}

export interface Emission {
    id: number;
    timeSeries: EmissionReport[];
}

export interface EmissionReport {
    ch4_emissions: number;
    co2_emissions: number;
    nox_emissions: number;
    pm_emissions: number;
    sox_emissions: number;
    report_from_utc: string;
    report_to_utc: string;
}
