import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ErrorComponent } from '../shared/error/error.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListarImagenComponent } from '../components/listar-imagen/listar-imagen.component';
import { BuscarImagenComponent } from '../components/buscar-imagen/buscar-imagen.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    ErrorComponent,
    NavbarComponent,
    ListarImagenComponent,
    BuscarImagenComponent,
  ]
})
export class Tab2PageModule {}
