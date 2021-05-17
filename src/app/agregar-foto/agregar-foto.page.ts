import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CameraService } from '../camera/camera.service';
import { FotoService } from '../tus-fotos/foto.service';

@Component({
  selector: 'app-agregar-foto',
  templateUrl: './agregar-foto.page.html',
  styleUrls: ['./agregar-foto.page.scss'],
})
export class AgregarFotoPage implements OnInit {
  opctions: any = { weekday: 'long', month:'long', day: 'numeric',hour:'numeric',minute:'numeric'};

  imgForm: FormGroup;

  constructor(
    private fotoService: FotoService,
    private router: Router,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private cameraService: CameraService
   )
  {}

  Data: any[] = [];

  // imagenes: Foto[] = [];
  isLoading = false;
  previsualizacion: string = 'http://www.puntogps.com/images/img-no-disponible.jpg';

  ngOnInit() {
    this.fotoService.dbState().subscribe((res) => {
      if (res) {
        this.fotoService.fetchFotos().subscribe((item) => {
          this.Data = item;
        });
      }
    });

    this.imgForm = this.formBuilder.group({
      titulo: [''],
      descrip: [''],
    });
  }
  fechaEsp: any;
// horario: new Date (this.myForm.value['horario']).toLocaleDateString('es-Mx', this.opctions)
  send() {
    let fecha = new Date();
    this.fechaEsp = new Date(fecha).toLocaleDateString('es-Mx', this.opctions);
    this.fotoService.addFoto(
        this.imgForm.value.titulo,
        this.imgForm.value.descrip,
        this.previsualizacion,
        this.fechaEsp
      )
      .then((res) => {
        console.log(res);
        // this.router.navigate(['/']);
      });
      this.getBack();
  }
  getBack() {
    //con esta función vamos a la ventana de agregar receta,
    //donde podemos subir una imágen de la receta, su nombre y su preparación

    this.router.navigateByUrl('/');
  }

  async takePhoto(){
    const photo = await this.cameraService.getPhoto()
    this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String;
  }

}
