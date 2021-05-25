import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-imagen-modal',
  templateUrl: './imagen-modal.page.html',
  styleUrls: ['./imagen-modal.page.scss'],
})
export class ImagenModalPage implements OnInit {
  //estas variables se muestran en el html, la imagen la muestra en un <ion-img>
  imagen: string;
  titulo: string;
  descripcion:string;
  fecha:string;

  constructor(
    private modalCtrl: ModalController,//usamos un modalcontroller para abrir la ventana modal
    private navparams: NavParams,     //usamos navparams para recibir los parámetros de la función verimagen en tusfotospage.ts
    private loadingController: LoadingController//el loading controller
  ){
    this.loadingController
      .create({
        message: 'Cargando imagen',
      }).then((loading) => loading.present());

    this.imagen = this.navparams.get('imagen'); //AQUI RECIBE LOS PARAMETROS DE LA FUNCION VER IMAGEN EN TUSFOTOSPAGE.TS
    this.titulo = this.navparams.get('titulo');
    this.descripcion = this.navparams.get('descripcion');
    this.fecha = this.navparams.get('fecha');
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadingController.dismiss();
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
