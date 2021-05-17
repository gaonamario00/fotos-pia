import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.scss'],
})
export class ListarImagenComponent implements OnInit {

  termino = '';
  suscription: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagensPorPagina = 20;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  textoRelleno = true;

  constructor(private _imagenService: ImagenService) { 
    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.paginaActual = 1;
      this.loading = true;
      this.obtenerImagenes();
    })
  }

  ngOnInit():void {}

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino, this.imagensPorPagina, this.paginaActual).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.textoRelleno = false;
      

      if(data.hits.length === 0) {
        this._imagenService.setError('No se encontró ningún resultado');
        return;
      }

      this.calcularTotalPaginas = Math.ceil(data.totalHits/ this.imagensPorPagina);

      this.listImagenes = data.hits;
    }, error => {
      this._imagenService.setError('Ocurrió un error');
      this.loading = false;
    })
  }

  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaSiguiente() {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass() {
    if(this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }

  paginaSiguienteClass() {
    if(this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else {
      return true;
    }
  }

}
