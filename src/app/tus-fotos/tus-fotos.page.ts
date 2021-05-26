import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FotoService } from './foto.service';
import { ModalController } from "@ionic/angular";
import { ImagenModalPage } from "../imagen-modal/imagen-modal.page";
import { Foto } from './fotos.model';

@Component({
  selector: 'app-tus-fotos',
  templateUrl: './tus-fotos.page.html',
  styleUrls: ['./tus-fotos.page.scss'],
})
export class TusFotosPage implements OnInit {
  id: any;
  imgForm: FormGroup;
  isEmpty:boolean = false;

  constructor(
    private fotoService: FotoService,
    private router: Router,//para movernos por las rutas, se usa en goToAdd
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalCtrl : ModalController
  )
  {}
  Data: Foto[] = [];
  previsualizacion: string;
//trae los registros de sqlite
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
    //valida el form
    this.imgForm = this.formBuilder.group({
      titulo: [''],
      descrip: [''],
    });

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

  verImagen(img, titulo, descrip,fecha) { //abre una ventana modal

    this.modalCtrl.create({
      component : ImagenModalPage,
      componentProps : {
        imagen : img,
        titulo: titulo,
        descripcion:descrip,
        fecha:fecha,
      }

    }).then(modal => modal.present())
  }

}

