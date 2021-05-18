import { Injectable } from '@angular/core';
import { Foto } from './fotos.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotoService {


  private storage: SQLiteObject;
  imagenes = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'fotos.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchFotos(): Observable<Foto[]> {
    return this.imagenes.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql',
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getFotos();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getFotos(){
    return this.storage.executeSql('SELECT * FROM fotos', []).then(res => {//where usuario_id = USUARIO_ID
      let items: Foto[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            titulo: res.rows.item(i).titulo,
            descrip:res.rows.item(i).descrip,
            imagen: res.rows.item(i).imagen,
            fecha:res.rows.item(i).fecha
           });
        }
      }
      this.imagenes.next(items);
    });
  }

  // getFotoEdit(id:number){
  //   return this.storage.executeSql('SELECT * FROM fotos where id='+id, []).then(res => {//where usuario_id = USUARIO_ID
  //     let items: Foto[] = [];
  //     if (res.rows.length > 0) {
  //       for (var i = 0; i < res.rows.length; i++) {
  //         items.push({
  //           id: res.rows.item(i).id,
  //           titulo: res.rows.item(i).titulo,
  //           descrip:res.rows.item(i).descrip,
  //           imagen: res.rows.item(i).imagen,
  //           fecha:res.rows.item(i).fecha
  //          });
  //       }
  //     }
  //     this.imagenes.next(items);
  //   });
  // }

  // Add
  addFoto(titulo, descrip, imagen, fecha) {
    let data = [titulo, descrip, imagen, fecha];
    return this.storage.executeSql('INSERT INTO fotos (titulo, descrip, imagen, fecha) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      this.getFotos();
    });
  }

  // Get single object
  getFoto(id): Promise<any> {
    return this.storage.executeSql('SELECT * FROM fotos WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        titulo: res.rows.item(0).titulo,
        descrip:res.rows.item(0).descrip,
        imagen: res.rows.item(0).imagen,
        fecha:res.rows.item(0).fecha
      }
    });
  }

  // Update
  updateFoto(id, foto: Foto) {
    let data = [foto.titulo,foto.descrip, foto.imagen, foto.fecha];
    return this.storage.executeSql(`UPDATE fotos SET titulo = ?, descrip =?, imagen = ?, fecha = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getFotos();
    })
  }

  // Delete
  deleteFoto(id) {
    return this.storage.executeSql('DELETE FROM fotos WHERE id = ?', [id])
    .then(_ => {
      this.getFotos();
    });
  }
}
