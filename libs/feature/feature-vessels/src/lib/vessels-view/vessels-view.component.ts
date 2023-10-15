import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { VesselsFacade, Vessel } from '@angular-monorepo/data-access';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
    selector: 'vessels-view',
    templateUrl: './vessels-view.component.html',
    styleUrls: ['./vessels-view.component.scss'],
})
export class VesselsViewComponent implements OnInit {
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
    gridOptions: GridOptions;
    $vesselsData: Observable<Vessel[]>;

    constructor(private vesselsFacade: VesselsFacade) { }

    ngOnInit(): void {
        this.$vesselsData = this.vesselsFacade.allVessels$;

        this.gridOptions = {
            enableCellTextSelection: true,
            defaultColDef: {
                filter: true,
                floatingFilter: true,
                sortable: true,
            },
            columnDefs: ['name', 'mmsi', 'imo', 'companyName', 'vesselType'].map((fieldName: string) => ({ field: fieldName })),
        };
    }

    onGridReady(): void {
        this.agGrid.api.sizeColumnsToFit();
    }
}
