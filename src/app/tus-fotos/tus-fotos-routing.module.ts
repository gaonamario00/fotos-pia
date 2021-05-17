import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TusFotosPage } from './tus-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: TusFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TusFotosPageRoutingModule {}
