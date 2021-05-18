import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FotoService } from '../tus-fotos/foto.service';

@Component({
  selector: 'app-imagen-completa',
  templateUrl: './imagen-completa.page.html',
  styleUrls: ['./imagen-completa.page.scss'],
})
export class ImagenCompletaPage implements OnInit {

  opctions: any = { weekday: 'long', month:'long', day: 'numeric',hour:'numeric',minute:'numeric'};


img: string;
tags:string;
user:string;
fechaEsp:any;

  constructor(
    private actRoute: ActivatedRoute,
    private fotoService: FotoService,
    private toast: ToastController
  ) {
    this.img = this.actRoute.snapshot.paramMap.get('img');
    this.tags = this.actRoute.snapshot.paramMap.get('tags');
    this.user ='By '+ this.actRoute.snapshot.paramMap.get('user');
  }

  ngOnInit() {
  }

  addToMyPhotos(){
    let fecha = new Date();
    this.fechaEsp = new Date(fecha).toLocaleDateString('es-Mx', this.opctions);
    this.fotoService.addFoto(this.user,this.tags,this.img,this.fechaEsp).then(async (res)=>{
    let toast = await this.toast.create({
      message: 'Imagen agregada con éxito',
      duration: 2500,
    });
    toast.present();
  }
    )
}
}
