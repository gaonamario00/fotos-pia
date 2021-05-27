import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenDetallePage } from './imagen-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenDetallePageRoutingModule {}
