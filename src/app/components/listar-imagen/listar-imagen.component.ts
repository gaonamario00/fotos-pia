import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.scss'],
})
export class ListarImagenComponent implements OnInit {
    termino = ''; //aqui guardamos el nombre del termino, por defecto es un vacio
    suscription: Subscription; //se usa para guardar la suscripcion para obtener el termino de busqueda/nombre
    listImagenes: any[] = []; //se utiliza para guardar todas las imagenes en un array
    loading = false; //variable para mostrar u ocultar un spinner
    imagensPorPagina = 20;//así delimitamos con cuántos registros nos puede responder la api
    paginaActual = 1; //utilizamos esta variable para saber en que pagina estamos
    calcularTotalPaginas = 0; //variable para contar cuantas paginas

    textoRelleno = true;

    constructor(private _imagenService: ImagenService) {
      // hace una subscripcion para mostrar los datos mediante el termino de busqueda
        this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
        this.termino = data;
        this.paginaActual = 1;
        this.loading = true;
        this.obtenerImagenes();
      })
    }

    ngOnInit() {}

    //esta funcion nos sirve para obtener las imagenes, pasandole como parametros datos necesarios para que
    //muestre x numero de imagenes por pagina, en que pagina estas y el nombre de las imagenes a buscar
    obtenerImagenes() {
      this._imagenService.getImagenes(this.termino, this.imagensPorPagina, this.paginaActual).subscribe(data => {
        console.log(data);
        this.loading = false;
        this.textoRelleno = false;

        //si no encuentra alguna imagen con el nombre dado, mostrará un error
        if(data.hits.length === 0) {
          this._imagenService.setError('No se encontró ningún resultado');
          this.listImagenes = [];
          this.textoRelleno = true;
          return;
        }

        //hacemos una operacion matematica para calcular el numero total de paginas
        this.calcularTotalPaginas = Math.ceil(data.totalHits/ this.imagensPorPagina);

        this.listImagenes = data.hits;
      }, error => {
        this._imagenService.setError('Ocurrió un error');
        this.loading = false;

        this.textoRelleno = false;
      })
    }

    //se resta en 1 a la pagina actual y vuelve a obtener la imagenes
    paginaAnterior() {
      this.paginaActual--;
      this.loading = true;
      this.listImagenes = [];
      this.obtenerImagenes();
    }

    //se incrementa en 1 la pagina actual y vuelve a obtener la imagenes
    paginaSiguiente() {
      this.paginaActual++;
      this.loading = true;
      this.listImagenes = [];
      this.obtenerImagenes();
    }

    //funcion para determinar si se va a mostrar el boton pagina anterior
    paginaAnteriorClass() {
      if(this.paginaActual === 1) {
        return false;
      } else {
        return true;
      }
    }

    //funcion para determinar si se va a mostrar el boton pagina siguiente
    paginaSiguienteClass() {
      if(this.paginaActual === this.calcularTotalPaginas) {
        return false;
      } else {
        return true;
      }
    }

  }
