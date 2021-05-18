import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenCompletaPageRoutingModule } from './imagen-completa-routing.module';

import { ImagenCompletaPage } from './imagen-completa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenCompletaPageRoutingModule
  ],
  declarations: [ImagenCompletaPage]
})
export class ImagenCompletaPageModule {}
