import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class TopicService{
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  prueba() {
    return 'Hola mundo desde el topic service';
  }

  addTopic(token, topic): Observable<any>{
    const params = JSON.stringify(topic);

    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);

    // Hacer peticion ajax
    return this._http.post(this.url + 'topic', params, {headers});
  }

  getTopicsByUser(userId): Observable<any>{
    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Hacer peticion ajax
    return this._http.get(this.url + 'user-topics/' + userId, {headers});
  }

  getTopic(id): Observable<any> {
    return this._http.get(this.url + 'topic/' + id);
  }

  update(token, id, topic): Observable<any> {
    const params = JSON.stringify(topic);

    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);

    // Hacer peticion ajax
    return this._http.put(this.url + 'topic/' + id, params, {headers});
  }

  delete(token, id): Observable<any> {
    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    // Hacer peticion ajax
    return this._http.delete(this.url + 'topic/' + id, {headers});
  }

  getTopics(page = 1): Observable<any> {
    return this._http.get(this.url + 'topics/' + page);
  }

  search(searchString): Observable<any>{
    return this._http.get(this.url + 'search/' + searchString);
  }

}
