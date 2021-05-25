import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenModalPage } from './imagen-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenModalPageRoutingModule {}
