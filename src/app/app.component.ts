import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LagoMotorsClient';
  navLinks = [
    { path: 'newVehicleForm', label: 'Add_Vehicle' }

  ];
  get fullyear(): number {
    const footerDate = new Date();
    const year = footerDate.getFullYear();
    return year;
  }
}
