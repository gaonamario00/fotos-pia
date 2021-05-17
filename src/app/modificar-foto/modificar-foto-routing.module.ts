import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarFotoPage } from './modificar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarFotoPageRoutingModule {}
