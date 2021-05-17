import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoService } from '../tus-fotos/foto.service';
import { Foto } from '../tus-fotos/fotos.model';
import { EditFotoService } from './edit-foto.service';

@Component({
  selector: 'app-modificar-foto',
  templateUrl: './modificar-foto.page.html',
  styleUrls: ['./modificar-foto.page.scss'],
})
export class ModificarFotoPage implements OnInit {
  id: any;
  updateForm: FormGroup;
  foto: Foto;
  previsualizacion: string;
  fecha: Date;
  Data: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, // se agrega este parametro para navegar a otra pantalla
    // private cameraService: CameraService,
    private formBuilder: FormBuilder,
    // private fotoService :FotoService,
    private editService: EditFotoService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.editService.id = this.id;
    this.ngOnInit();
    // this.fotoService.getFotoEdit(this.id).then(res => {
    //   this.updateForm.setValue({
    //     titulo: '',
    //     descrip: '',
    //   });
    //   // this.foto.id = this.id;
    //   // this.foto.titulo = res['titulo'];
    //   // this.previsualizacion = res['imagen'];
    //   // this.foto.fecha = res['fecha'];
    //   // this.foto.descrip = res['descrip'];
    // // this.previsualizacion = this.foto.imagen;
    // }

    // );
  }
  async ngOnInit() {
    this.editService.dbState().subscribe((res) => {
      if (res) {
        this.editService.fetchFotos().subscribe((item) => {
          this.Data = item;
        });
      }
    });

    //   this.updateForm = this.formBuilder.group({
    //     titulo: [''],
    //     descrip: [''],
    //   })

    //////////////
    // this.updateForm = this.formBuilder.group({
    //   titulo: [''],
    //   descrip: [''],
    // });

    // this.editService.dbState().subscribe((res) => {
    //   if (res) {
    //     this.editService.fetchFotos().subscribe((item) => {
    //       this.Data = item;
    //     });
    //   }
    // });
  }

  updateFoto() {
    // this.foto.titulo = this.updateForm.value.titulo;
    // this.foto.imagen = this.previsualizacion;
    // // let fecha = new Date().getDate();
    // this.foto.fecha = new Date();
    // this.foto.descrip = this.updateForm.value.descrip;
    // this.editService.updateFoto(this.id,this.foto);
  }

  borrar() {
    // this.editService.deleteFoto(this.id);
  }

  // // async takeFoto(){
  // //   const photo = await this.cameraService.getPhoto()
  // //   this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String;
  // // }
}
