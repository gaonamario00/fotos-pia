import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ErrorComponent } from './shared/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { ListarImagenComponent } from './components/listar-imagen/listar-imagen.component';
// import { BuscarImagenComponent } from './components/buscar-imagen/buscar-imagen.component';

@NgModule({
  declarations: [
    AppComponent,
    // BuscarImagenComponent,
    // ListarImagenComponent,
    NavbarComponent,
    ErrorComponent,
    SpinnerComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 750,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true
    }),
    BrowserAnimationsModule
  ],
  providers: [
    SQLite,
    SQLitePorter,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
