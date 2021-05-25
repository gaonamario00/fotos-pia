import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenModalPageRoutingModule } from './imagen-modal-routing.module';

import { ImagenModalPage } from './imagen-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenModalPageRoutingModule
  ],
  declarations: [ImagenModalPage]
})
export class ImagenModalPageModule {}
