import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ { path: 'newVehicleForm',  component: FormVehicleComponent },
                         { path: '',   redirectTo: '/newVehicleForm', pathMatch: 'full' }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
