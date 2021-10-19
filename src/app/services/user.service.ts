import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
  public url: string;
  private identity;
  private token;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  prueba() {
    return 'Hola mundo desde el servicio de angular';
  }

  register(user): Observable<any>{
    // Convertir el objeto del usuario a un json string
    const params = JSON.stringify(user);

    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Hacer peticion ajax
    return this._http.post(this.url + 'register', params, {headers});

  }

  signup(user, gettoken = null): Observable<any>{

    // Comprobar si llega el gettoken
    if (gettoken != null){
      user.gettoken = gettoken;
    }

    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, {headers} );

  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if ( identity && identity != null && identity != undefined && identity != 'undefined'){
      this.identity = identity;
    }
    else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if ( token && token != null && token != undefined && token != 'undefined'){
      this.token = token;
    }
    else {
      this.token = null;
    }
    return this.token;
  }

  update(user): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());
    return this._http.put(this.url + '/user/update', params, {headers});
  }

  getUsers(): Observable<any> {
    return this._http.get(this.url + 'users');
  }

  getUser(userId): Observable<any> {
    return this._http.get(this.url + 'user/' + userId);
  }

}
