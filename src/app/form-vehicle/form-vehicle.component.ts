import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../interface/vehicle';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { MyErrorStateMatcher } from 'src/MyErrorStateMatcher';

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
  fetures: any[];
  matcher = new MyErrorStateMatcher();


  ngOnInit() {
    this.buildForm();
    this.getFeature();
    this.getVehicleMake();
  }
  buildForm() {
    this.form = new FormGroup({
      make: new FormControl('', Validators.required),
      models: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, ])
     });
    }

  getVehicleMake() {
    this.vehicleServ.getVehicles().subscribe( res => {
      this.vehicle = res;
    });
  }
  getFeature() {
    this.vehicleServ.getFeatures().subscribe( res => {
      this.fetures = res;
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
