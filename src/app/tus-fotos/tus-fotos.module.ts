import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TusFotosPageRoutingModule } from './tus-fotos-routing.module';

import { TusFotosPage } from './tus-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TusFotosPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TusFotosPage]
})
export class TusFotosPageModule {}
