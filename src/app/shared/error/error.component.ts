import { ImagenService } from '../../services/imagen.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  
  texto = '';
  mostrar = false;
  suscripcion: Subscription;  
  
  constructor(private _imagenService: ImagenService) { 
    this.suscripcion = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data;
    })
  }

  ngOnInit():void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 3500);
  }

}
