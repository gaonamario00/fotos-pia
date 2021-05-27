import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-imagen-detalle',
  templateUrl: './imagen-detalle.page.html',
  styleUrls: ['./imagen-detalle.page.scss'],
})
export class ImagenDetallePage implements OnInit {
  img: string;
  titulo:string;
  descrip:string;
  fecha: string;

  constructor(
    private actRoute: ActivatedRoute, //se usa para recibir los parametros
    ) {
      //recibe estos cuatro parametros mediante la url
      this.img = this.actRoute.snapshot.paramMap.get('img');
      this.titulo = this.actRoute.snapshot.paramMap.get('titulo');
      this.descrip = this.actRoute.snapshot.paramMap.get('descrip');
      this.fecha = this.actRoute.snapshot.paramMap.get('fecha');
    }

    ngOnInit() {
  }

  }
