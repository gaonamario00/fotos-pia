import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FotoService } from './foto.service';
import { ModalController } from "@ionic/angular";
import { ImagenModalPage } from "../imagen-modal/imagen-modal.page";

@Component({
  selector: 'app-tus-fotos',
  templateUrl: './tus-fotos.page.html',
  styleUrls: ['./tus-fotos.page.scss'],
})
export class TusFotosPage implements OnInit {
  id: any;
  imgForm: FormGroup;

  constructor(
    private fotoService: FotoService,
    private router: Router,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalCtrl : ModalController
  ) // private cameraService: CameraService,
  {}

  Data: any[] = [];

  // imagenes: Foto[] = [];
  isEmpty = true;
  previsualizacion: string;

  ngOnInit() {
    this.fotoService.dbState().subscribe((res) => {
      if (res) {
        this.fotoService.fetchFotos().subscribe((item) => {
          this.Data = item;
          this.isEmpty = false;
        });
      }
    });

    this.imgForm = this.formBuilder.group({
      titulo: [''],
      descrip: [''],
    });
  }

  send() {
    let fecha = new Date();

    this.fotoService
      .addFoto(
        this.imgForm.value.titulo,
        this.imgForm.value.descrip,
        this.previsualizacion,
        fecha
      )
      .then((res) => {
        console.log(res);
        // this.router.navigate(['/']);
      });
  }

  goToAdd() {
    //con esta función vamos a la ventana de agregar receta,
    //donde podemos subir una imágen de la receta, su nombre y su preparación

    this.router.navigateByUrl('/agregar-foto');
  }

  deleteFoto(id) {
    this.fotoService.deleteFoto(id).then(async (res) => {

      this.toastr.error('Hecho', 'Imagen eliminada',);
    }, (err) => {

    });
  }

  verImagen(img, titulo, descrip,fecha) {

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

  // async takeFoto(){
  //   const photo = await this.cameraService.getPhoto()
  //   this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String;
  // }
}

