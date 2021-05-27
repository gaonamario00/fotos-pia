import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private actRoute: ActivatedRoute, //se usa para obtener los parametros
    private fotoService: FotoService, //se usa para agregar un registro a la base de datos
    private toastr: ToastrService,//muestra una alarma
  ) {
    //recibe estos tres parametros mediante la url
    this.img = this.actRoute.snapshot.paramMap.get('img');
    this.tags = this.actRoute.snapshot.paramMap.get('tags');
    //se le agrega un by, ya que es el nombre del usuario que lo subio
    this.user ='By '+ this.actRoute.snapshot.paramMap.get('user');
  }

  ngOnInit() {
  }
  // usamos esta función para agregar la foto a la base de datos usando el fotoservice
  addToMyPhotos(){
    let fecha = new Date();
    this.fechaEsp = new Date(fecha).toLocaleDateString('es-Mx', this.opctions); //cambia la fecha a español
    //agregar el registro
    this.fotoService.addFoto(this.user,this.tags,this.img,this.fechaEsp).then(async (res)=>{

    this.toastr.success('Listo!', 'Imagen agregada');//muestra una alarma
  }
    )
}
}
