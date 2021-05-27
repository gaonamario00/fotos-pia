import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { CameraService } from '../camera/camera.service';
import { FotoService } from '../tus-fotos/foto.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-agregar-foto',
  templateUrl: './agregar-foto.page.html',
  styleUrls: ['./agregar-foto.page.scss'],
})
export class AgregarFotoPage implements OnInit {
  opctions: any = { weekday: 'long', month:'long', day: 'numeric',hour:'numeric',minute:'numeric'};

  imgForm: FormGroup;//se declara el formGroup para manejar los campos, no está inicializado
  IsThereAPhoto: boolean = false; //para saber si ya agregamos una foto o todavía debemos usar la foto por defecto

  constructor(
    private fotoService: FotoService,//el service con el que manipulamos las fotos
    public formBuilder: FormBuilder,//se inicializa el formBuilder
    private cameraService: CameraService,//para tomar fotos
    private toastr: ToastrService,//Para el mensaje
   )
  {}
  isEmpty: boolean = true;


  previsualizacion: string = 'src/assets/notfound.jpg'; //imagen que parece un error

  fechaEsp: string;

   ngOnInit() {
    this.IsThereAPhoto=false;

    this.imgForm = this.formBuilder.group({// validamos los campos del form
      titulo: new FormControl("",Validators.compose([
        Validators.required
        ])),
      descrip: new FormControl("",Validators.compose([
        Validators.required
      ])),
    });
  }

  send() {//función que manda el registro a la base de datos
    let fecha = new Date(); //para asignarle la fecha actual automáticamente

    this.fechaEsp = new Date(fecha).toLocaleDateString('es-Mx', this.opctions);//Castea la fecha a string en español
    this.fotoService.addFoto(
        this.imgForm.value.titulo,
        this.imgForm.value.descrip,
        this.previsualizacion,
        this.fechaEsp
      )
      .then( async ( res) => {
        this.toastr.success('Listo!', 'Imagen agregada');//lanza una notificacion de exito
      });
  }

  async takePhoto(){//función para tomar la foto, usa el cameraService y usa la propiedad base64String para pasarselo a previsualización
    const photo = await this.cameraService.getPhoto();
    this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String; //hace que sea un webViewPath
    this.IsThereAPhoto = true;
  }

}
