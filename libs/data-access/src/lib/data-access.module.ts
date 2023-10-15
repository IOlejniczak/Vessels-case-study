import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { ErrorInterceptor } from './error.interceptor';
import { VesselsFacade } from './+state/vessels.facade';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        VesselsFacade,
    ],
})
export class DataAccessModule {}
