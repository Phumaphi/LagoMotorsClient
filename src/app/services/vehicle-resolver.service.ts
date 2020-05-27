import { Injectable } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Vehicle } from '../interface/vehicle';
import { ErrorTracker } from './../interface/ErrorTracker';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleResolverService implements Resolve<Vehicle[] | ErrorTracker> {

  constructor(private vehicleserv: VehicleService) { }
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle[] | ErrorTracker> {
  return this.vehicleserv.getVehicles()
  .pipe(
    catchError(err => of(err))
  );
}
}

