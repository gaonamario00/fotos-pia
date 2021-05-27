import { Injectable } from '@angular/core';
import { Foto } from './fotos.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  //Este es el servicio con el que manipulamos la Base de Datos
  private storage: SQLiteObject;

  imagenes = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, //se utiliza para obtener la plataforma en la que se está ejecutando
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      //crea la base de datos
      this.sqlite
        .create({
          name: 'fotos.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable(); //regresa un observable que verifica el estado de la base de datos
  }

  fetchFotos(): Observable<Foto[]> {
    return this.imagenes.asObservable(); //regresa un observable con los datos de la base de datos
  }

  // Render fake data
  getFakeData() {
    this.httpClient
      .get(
        'assets/dump.sql',
        { responseType: 'text' }
      )
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data) //importa la base de datos
          .then((_) => {
            this.getFotos();
            this.isDbReady.next(true); //actualiza la informacion para los observables
          })
          .catch((error) => console.error(error));
      });
  }

  // Get list
  //recuerda que storage es un SQLiteObject
  getFotos() {
    return this.storage.executeSql('SELECT * FROM fotos', []).then((res) => { //busca los datos con el query
      let items: Foto[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({ //agrega los datos a la ultima posicion del arreglo
            id: res.rows.item(i).id,
            titulo: res.rows.item(i).titulo,
            descrip: res.rows.item(i).descrip,
            imagen: res.rows.item(i).imagen,
            fecha: res.rows.item(i).fecha,
          });
        }
      }
      this.imagenes.next(items); //actualiza la informacion para las suscripciones
    });
  }

  // Add
  addFoto(titulo, descrip, imagen, fecha) {
    //define un arreglo con los datos a insertar
    let data = [titulo, descrip, imagen, fecha];
    return this.storage
      .executeSql( //inserta el registro con el query
        'INSERT INTO fotos (titulo, descrip, imagen, fecha) VALUES (?, ?, ?, ?)',data)
      .then((res) => {
        this.getFotos(); //vuelve a get fotos para actualizar la info
      });
  }


  getFoto(id): Promise<any> {
    return this.storage
      .executeSql('SELECT * FROM fotos WHERE id = ?', [id]) //obtiene un solo registro mediante el query
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          titulo: res.rows.item(0).titulo,
          descrip: res.rows.item(0).descrip,
          imagen: res.rows.item(0).imagen,
          fecha: res.rows.item(0).fecha,
        };
      });
  }

  // Update
  updateFoto(id, foto: Foto) {
    //define un arreglo con los datos a actualizar
    let data = [foto.titulo, foto.descrip, foto.imagen, foto.fecha];
    return this.storage
      .executeSql( //filtra por el id
        `UPDATE fotos SET titulo = ?, descrip =?, imagen = ?, fecha = ? WHERE id = ${id}`,data)
      .then((data) => {
        this.getFotos();
      });
  }

  // Delete
  deleteFoto(id) {
    return this.storage
      .executeSql('DELETE FROM fotos WHERE id = ?', [id]) //filtra por el id para borrar
      .then((_) => {
        this.getFotos();
      });
  }
}
