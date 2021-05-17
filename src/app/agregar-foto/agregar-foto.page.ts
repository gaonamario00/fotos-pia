import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FotoService } from '../tus-fotos/foto.service';

@Component({
  selector: 'app-agregar-foto',
  templateUrl: './agregar-foto.page.html',
  styleUrls: ['./agregar-foto.page.scss'],
})
export class AgregarFotoPage implements OnInit {
  imgForm: FormGroup;

  constructor(
    private fotoService: FotoService,
    private router: Router,
    public formBuilder: FormBuilder,
    private toast: ToastController
  ) // private cameraService: CameraService,
  {}

  Data: any[] = [];

  // imagenes: Foto[] = [];
  isLoading = false;
  previsualizacion: string;

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
}
