/* Angular Modules */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';


/* Shared Modules */




@NgModule({
  imports: [

  CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [

  ]
})

export class SharedModule { }
