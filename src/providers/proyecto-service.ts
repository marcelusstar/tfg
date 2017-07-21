import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProyectosService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProyectoService
{
  data: any;
  apiUrl = 'http://localhost:3000/proyectos/';

  constructor(public http: Http)
  {
    console.log('Hello ProyectosService Provider');
  }

// PROYECTOS
// -----------------------------------------------------------------------------

    getProyectos()
    {
      if (this.data)
      {
        return Promise.resolve(this.data);
      }

      return new Promise(resolve =>
      {
        this.http.get(this.apiUrl)
          .map(res => res.json())
          .subscribe(data =>
          {
            this.data = data;
            resolve(this.data);
          });
      });
    }

// -----------------------------------------------------------------------------

  getProyecto(id)
  {
    if (this.data)
    {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve =>
    {
      this.http.get(this.apiUrl+'/:id')
        .map(res => res.json())
        .subscribe(data =>
        {
          this.data = data;
          resolve(this.data);
        });
    });
  }

// -----------------------------------------------------------------------------

    getProyectosAutorUsuario(usuario_alias)
    {
      if (this.data)
      {
        return Promise.resolve(this.data);
      }

      return new Promise(resolve =>
      {
        this.http.get(this.apiUrl+'autor_usuario/:usuario_alias')
          .map(res => res.json())
          .subscribe(data =>
          {
            this.data = data;
            resolve(this.data);
          });
      });
    }

// -----------------------------------------------------------------------------

    getProyectosUsuario(usuario_alias)
    {
      if (this.data)
      {
        return Promise.resolve(this.data);
      }

      return new Promise(resolve =>
      {
        this.http.get(this.apiUrl+'usuario/'+usuario_alias)
          .map(res => res.json())
          .subscribe(data =>
          {
            this.data = data;
            resolve(this.data);
          });
      });
    }

// -----------------------------------------------------------------------------

    newProyecto(data)
    {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return new Promise((resolve, reject) =>
      {
        this.http.post(this.apiUrl, data, headers)
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
