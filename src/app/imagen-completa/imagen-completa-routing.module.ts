import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenCompletaPage } from './imagen-completa.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenCompletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenCompletaPageRoutingModule {}
