import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../interface/vehicle';
import { Feature } from '../interface/Feature';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUri = 'http://localhost:5000/api';


  constructor(private http: HttpClient) {
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUri.concat('/makes'));
  }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.baseUri.concat('/features'))
    .pipe(tap(data => {
      map(res => res);
      console.log(JSON.stringify(data));
    } ));
  }
}
