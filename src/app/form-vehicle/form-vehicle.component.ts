import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {

  constructor(private vehicleServ: VehicleService, private fb: FormBuilder, private snackbar: MatSnackBar) { }

  form: FormGroup;
  makeId: number;
  modelId: number;
  features: any[];
  makeNModels: any[];
  models = new Array();
  name: string;
  email: string;
  phone: string;
  isRegistered: boolean;

  vehicle = {
    id: 1,
    modelId: 0,
    isRegistered: true,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };
  myJSON: object | JSON;

  ngOnInit() {
    this.buildForm();
    this.getFeature();
    this.getVehicleMake();

  }
  buildForm() {
    this.form = new FormGroup({
      makeId: new FormControl('', Validators.required),
      modelId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      isRegistered: new FormControl('', Validators.required),
      features: this.fb.array([]),
    });
  }

  onMakeChange() {
    const vehicleId = Number(this.makeId);
    const selectedMaker = this.makeNModels.filter(v => v.id === vehicleId).map(m => m.models);
    for (const i of selectedMaker) {
      this.models = [];
      this.models = this.models.concat(i);

    }

  }

  getVehicleMake() {
    this.vehicleServ.getVehicles().subscribe(res => {
      this.makeNModels = res;
    });
  }
  getFeature() {
    this.vehicleServ.getFeatures().subscribe(res => {
      this.features = res;
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('features') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      const i = checkArray.controls.findIndex(x => x.value === e.source.value);
      checkArray.removeAt(i);
    }

    this.vehicle.features = (checkArray.value);
    this.vehicle.id = Number(this.makeId);
    this.vehicle.modelId = Number(this.modelId);
    this.vehicle.isRegistered = this.isRegistered;

  }
  onContactChange() {
    this.vehicle.contact.name = this.name;
    this.vehicle.contact.email = this.email;
    this.vehicle.contact.phone = this.phone;
    console.log(this.vehicle);
  }
  save() {
    if (this.form.valid === true) {
      this.vehicleServ.createVehicle(this.vehicle).subscribe();
    }
  }
}
