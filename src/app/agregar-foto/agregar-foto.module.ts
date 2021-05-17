import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarFotoPageRoutingModule } from './agregar-foto-routing.module';

import { AgregarFotoPage } from './agregar-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarFotoPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [AgregarFotoPage]
})
export class AgregarFotoPageModule {}
