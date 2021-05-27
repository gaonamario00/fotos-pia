import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  // función para mostrar un error
  setError(mensaje: string) {
    this.error$.next(mensaje);
  }

  //función para obtener el error y retornarlo como un observable
  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  //envía el termino de busqueda que se insertó en el input para obtener la imagen
  enviarTerminoBusqueda(termino: string) {
    this.terminoBusqueda$.next(termino);
  }

  //obtiene el termino de busqueda del input y lo guarda en una variable observable
  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

  //pide las imagenes a la api con los terminos y variables necesarias
  getImagenes(termino: string, imagensPorPagina: number, paginaActual: number): Observable<any> {
    const KEY = '21639269-bda7a9249984dc0c7b473df96';
    const URL = 'https://pixabay.com/api/?key=' + KEY + '&q=' + termino +
                '&per_page=' + imagensPorPagina + '&page=' + paginaActual;
    return this.http.get(URL);
  }

}
