import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FotoService } from './foto.service';
import { ModalController } from "@ionic/angular";
import { Foto } from './fotos.model';

@Component({
  selector: 'app-tus-fotos',
  templateUrl: './tus-fotos.page.html',
  styleUrls: ['./tus-fotos.page.scss'],
})
export class TusFotosPage implements OnInit {
  isEmpty:boolean = false;

  constructor(
    private fotoService: FotoService, //para hacer uso de la base de datos en sqlite
    private router: Router,//para movernos por las rutas, se usa en goToAdd
    private toastr: ToastrService, //para mostrar una alerta al agregar y eliminar registros
    private modalCtrl : ModalController //abre la imagen en una ventana modal
  )
  {}

  Data: Foto[] = [];
//trae los registros de sqlite
//verifica el estado de la base de datos
//se suscribe al subject para traer cambios
//hace Data igual a cada fila de la base de datos
  ngOnInit() {
    this.isEmpty=true;
    this.fotoService.dbState().subscribe((res) => {
      if (res) {
        this.fotoService.fetchFotos().subscribe((item) => {
          this.Data = item;
          this.isEmpty=false;
        });
      }
    });
    //verifica si el data esta vacio, para mostrar el mensaje de que
    //no hay registros que mostrar
    if(this.Data.length==0){
      this.isEmpty=true;
    }else{
      this.isEmpty=false;
    }
  }

  //te redirige a la pagina de agregar foto
  goToAdd() {
    this.router.navigateByUrl('/agregar-foto');
  }

  //borra la foto
  deleteFoto(id) {
    this.fotoService.deleteFoto(id).then(async (res) => {
      this.toastr.error('Hecho', 'Imagen eliminada',); //manda una alerta cuandolo borra
    }, (err) => {
    });
  }



}

