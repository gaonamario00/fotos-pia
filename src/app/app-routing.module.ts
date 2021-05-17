import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modificar-foto/:id',
    loadChildren: () => import('./modificar-foto/modificar-foto.module').then( m => m.ModificarFotoPageModule)
  },
  {
    path: 'agregar-foto',
    loadChildren: () => import('./agregar-foto/agregar-foto.module').then( m => m.AgregarFotoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
