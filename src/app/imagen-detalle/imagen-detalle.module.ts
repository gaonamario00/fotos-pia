import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenDetallePageRoutingModule } from './imagen-detalle-routing.module';

import { ImagenDetallePage } from './imagen-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenDetallePageRoutingModule
  ],
  declarations: [ImagenDetallePage]
})
export class ImagenDetallePageModule {}
