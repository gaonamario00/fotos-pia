import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarFotoPageRoutingModule } from './modificar-foto-routing.module';

import { ModificarFotoPage } from './modificar-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarFotoPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [ModificarFotoPage]
})
export class ModificarFotoPageModule {}
