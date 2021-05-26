import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  Data: any[] = [];
  isEmpty: boolean = true;

  isLoading = false;
  previsualizacion: string = 'http://www.puntogps.com/images/img-no-disponible.jpg'; //imagen que parece un error

  ngOnInit() {
    this.fotoService.dbState().subscribe((res) => {
      if (res) {
        this.fotoService.fetchFotos().subscribe((item) => {
          this.Data = item;
        });
      }
    });

    this.imgForm = this.formBuilder.group({//hacemos los campos del form como vacíos
      titulo: [''],
      descrip: [''],
    });
  }
  fechaEsp: any;

  send() {//función que manda la imagen a la base de datos
    let fecha = new Date();
    this.fechaEsp = new Date(fecha).toLocaleDateString('es-Mx', this.opctions);//para asignarle la fecha actual automáticamente
    this.fotoService.addFoto(
        this.imgForm.value.titulo,
        this.imgForm.value.descrip,
        this.previsualizacion,
        this.fechaEsp
      )
      .then( async ( res) => {
        this.toastr.success('Listo!', 'Imagen agregada');//ventanita con mensaje
      });
  }

  async takePhoto(){//función para tomar la foto, usa el cameraService y la convierte a base64
    const photo = await this.cameraService.getPhoto()
    this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String;
    this.IsThereAPhoto = true;
  }

}
