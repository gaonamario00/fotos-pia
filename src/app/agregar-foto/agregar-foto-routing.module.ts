import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarFotoPage } from './agregar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarFotoPageRoutingModule {}
