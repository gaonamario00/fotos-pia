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

    //se suscribe para ver si ocurre algun error al momento de llamar a la api
    this.suscripcion = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data;
    })
  }

  ngOnInit():void {}

  //cuando hay un error te quita la suscripción al imagenservice
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  //cuando sucede un error muestra el error y le pone un timer de 3.5 seg
  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 3500);
  }

}
