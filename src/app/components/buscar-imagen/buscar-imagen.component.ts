import { ImagenService } from './../../services/imagen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.scss'],
})
export class BuscarImagenComponent implements OnInit {

  nombreImagen: string;

  constructor(private _imagenService: ImagenService) { 
    this.nombreImagen = ''
  }

  ngOnInit() {}

  buscarImagenes() {
    if(this.nombreImagen === '') {
      this._imagenService.setError('Agrega un texto de busqueda');
      return;
    }

    this._imagenService.enviarTerminoBusqueda(this.nombreImagen);
  }

}
