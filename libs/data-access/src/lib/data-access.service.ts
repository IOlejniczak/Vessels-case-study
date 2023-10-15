import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Emission, Vessel } from './api-models';

const API_URL = 'https://frontendteamfiles.blob.core.windows.net/exercises';

@Injectable({
    providedIn: 'root',
})
export class DataAccessService {

    constructor(private http: HttpClient) { }

    getEmissions(): Observable<Emission[]> {
        return this.http.get<Emission[]>(`${API_URL}/emissions.json`);
    }

    getVessels(): Observable<Vessel[]> {
        return this.http.get<Vessel[]>(`${API_URL}/vessels.json`);
    }
}
