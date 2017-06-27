import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiService
{

  data: any;
  apiUrl = 'http://localhost:3000';

  constructor(public http: Http)
  {
    console.log('Hello ApiService Provider');
  }

// USUARIOS
// -----------------------------------------------------------------------------

  getUsuarios()
  {
    if (this.data)
    {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve =>
    {
      this.http.get(this.apiUrl+'/usuarios')
        .map(res => res.json())
        .subscribe(data =>
        {
          this.data = data;
          resolve(this.data);
        });
    });
  }

// -----------------------------------------------------------------------------

  getUsuario(id)
  {
    if (this.data)
    {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve =>
    {
      this.http.get(this.apiUrl+'/usuarios/:id')
        .map(res => res.json())
        .subscribe(data =>
        {
          this.data = data;
          resolve(this.data);
        });
    });
  }

// -----------------------------------------------------------------------------

  loginUsuario(usuario)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) =>
    {
      this.http.post(this.apiUrl+'/usuarios/login', usuario, headers)
        .map(res => res.json())
        .subscribe(data =>
        {
          console.log(JSON.stringify(data));
          resolve(data);
        }, (err) =>
        {
          reject(err);
        });
    });
  }

// -----------------------------------------------------------------------------

  newUsuario(data)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) =>
    {
      this.http.post(this.apiUrl+'/usuarios', data, headers)
        .map(res => res.json())
        .subscribe(data =>
        {
          console.log(JSON.stringify(data));
          resolve(data);
        }, (err) =>
        {
          reject(err);
        });
    });
  }

}
