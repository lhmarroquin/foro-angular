import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class CommentService{
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  prueba() {
    return 'Hola mundo desde el topic service';
  }

  add(token, comment, topicId): Observable<any>{
    const params = JSON.stringify(comment);

    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    // Hacer peticion ajax
    return this._http.post(this.url + 'comment/topic/' + topicId, params, {headers});
  }

  delete(token, topicId, commentId): Observable<any> {
    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    // Hacer peticion ajax
    return this._http.delete(this.url + 'comment/' + topicId + '/' + commentId, {headers});
  }



}
