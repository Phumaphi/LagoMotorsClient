import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../interface/vehicle';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {

  constructor(private vehicleServ: VehicleService, private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  form: FormGroup;
  vehicle: Vehicle[];
  makes: string;
  models = new Array();

  ngOnInit() {
    this.buildForm();
    this.getVehicleMake();
  }
  getVehicleMake() {
    this.vehicleServ.getVehicles().subscribe( res => {
      this.vehicle = res;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      make: ['', Validators.required],
      // name = new FormControl('');
      models: ['', Validators.required],
    });
  }
  onMakeChange() {
    const vehicleId = Number(this.makes);
    const selectedMaker = this.vehicle.filter(v => v.id === vehicleId).map(m => m.models);
    for (const i of selectedMaker) {
      this.models = [];
      this.models = this.models.concat(i);
    }
  }
}
