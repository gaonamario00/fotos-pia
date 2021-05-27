import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'agregar-foto',
    loadChildren: () => import('./agregar-foto/agregar-foto.module').then( m => m.AgregarFotoPageModule)
  },
  {
    path: 'imagen-completa/:img/:tags/:user',
    loadChildren: () => import('./imagen-completa/imagen-completa.module').then( m => m.ImagenCompletaPageModule)
  },
  {
    path: 'imagen-detalle/:img/:titulo/:descrip/:fecha',
    loadChildren: () => import('./imagen-detalle/imagen-detalle.module').then( m => m.ImagenDetallePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
