import { Component, OnInit } from '@angular/core';
import { filter, map, skipWhile, take } from 'rxjs';
import * as Highcharts from 'highcharts';
import BrandDarkTheme from 'highcharts/themes/brand-dark';
import { DateTime } from 'luxon';

import { VesselsFacade, EmissionReport, Vessel } from '@angular-monorepo/data-access';

BrandDarkTheme(Highcharts);

interface ChartDataPoint {
    0: number;
    1: number;
}

interface EmissionChartData {
    ch4_emissions: ChartDataPoint[];
    nox_emissions: ChartDataPoint[];
    pm_emissions: ChartDataPoint[];
    sox_emissions: ChartDataPoint[];
}


@Component({
    selector: 'emissions-view',
    templateUrl: './emissions-view.component.html',
    styleUrls: ['./emissions-view.component.scss'],
})
export class EmissionsViewComponent implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options;
    vesselsToView: Vessel[];
    selectedVessel: Vessel;

    constructor(
        public vesselsFacade: VesselsFacade,
    ) { }

    ngOnInit(): void {
        this.vesselsFacade.vesselsWithEmission$.pipe(
            skipWhile((vessels: Vessel[]) => !vessels.length),
            take(1),
        ).subscribe({
            next: (vessels: Vessel[]) => {
                this.selectedVessel = vessels[0];
                this.vesselsToView = vessels;
                this.vesselsFacade.selectedVesselById(this.selectedVessel.id);
            },
        });

        this.vesselsFacade.emissionsForVessel$.pipe(
            filter((emissionReports: EmissionReport[]) => !!emissionReports.length),
            map((emissionReports: EmissionReport[]) => this.mapEmissions(emissionReports)),
        ).subscribe((chartData: EmissionChartData) => {
            this.setChartConfig(chartData);
        });

    }

    setVessel(): void {
        this.vesselsFacade.selectedVesselById(this.selectedVessel.id);
    }

    trackByFn(index: number): number {
        return index;
    }

    private mapEmissions(emissionReports: EmissionReport[]): EmissionChartData {
        const params = {
            ch4_emissions: [],
            nox_emissions: [],
            pm_emissions: [],
            sox_emissions: [],
        } as EmissionChartData;

        emissionReports.forEach((emissionReport: EmissionReport) => {
            const millis = DateTime.fromISO(emissionReport.report_from_utc).toMillis();
            params.ch4_emissions.push([millis, emissionReport.ch4_emissions]);
            params.nox_emissions.push([millis, emissionReport.nox_emissions]);
            params.pm_emissions.push([millis, emissionReport.pm_emissions]);
            params.sox_emissions.push([millis, emissionReport.sox_emissions]);
        });

        return params;
    }

    private setChartConfig(chartData: EmissionChartData): void {
        this.chartOptions = {
            series: [
                {
                    data: chartData.ch4_emissions,
                    name: 'Methane',
                },
                {
                    data: chartData.nox_emissions,
                    name: 'NOx',
                },
                {
                    data: chartData.pm_emissions,
                    name: 'PM',
                },
                {
                    data: chartData.sox_emissions,
                    name: 'SOx',
                },
            ],
            xAxis: {
                type: 'datetime',
            },
            title: {
                text: `${this.selectedVessel.name} Emissions`,
            },
        } as object;
    }
}
