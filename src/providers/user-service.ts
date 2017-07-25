import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class Usuario
{
  alias: string;

  constructor(alias: string)
  {
    this.alias = alias;
  }
}

@Injectable()
export class UserService
{
  usuarioActual: Usuario;

  data: any;
  apiUrl = 'http://localhost:3000';

  constructor(public http: Http)
  {
    console.log('Hello UserService Provider');
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
          this.usuarioActual = new Usuario(usuario.alias);
          console.log("Usuario actual");
          console.log(this.usuarioActual);
          console.log(JSON.stringify(data));
          resolve(data);
        }, (err) =>
        {
          reject(err);
        });
    });
  }

// -----------------------------------------------------------------------------

  logout()
  {
    return new Promise(resolve =>
    {
      this.usuarioActual = null;
    });
  }

// -----------------------------------------------------------------------------

  usuarioEstaLogueado()
  {
    if (this.usuarioActual != null)
      return true;
  }

// -----------------------------------------------------------------------------

  aliasUsuarioLogueado()
  {
    return this.usuarioActual.alias;
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

// -----------------------------------------------------------------------------
// CAMBIAR AL PROVIDER DE ORGANIZACIONES
getOrganizaciones()
{
  if (this.data)
  {
    return Promise.resolve(this.data);
  }

  return new Promise(resolve =>
  {
    this.http.get(this.apiUrl+'/organizaciones')
      .map(res => res.json())
      .subscribe(data =>
      {
        this.data = data;
        resolve(this.data);
      });
  });
}

// -----------------------------------------------------------------------------

  addUsuarioAOrganizacion(data)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) =>
    {
      this.http.post('http://localhost:3000/usuarios/organizacion', data, headers)
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

  addUsuarioAProyecto(data)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) =>
    {
      this.http.post('http://localhost:3000/usuarios/proyecto', data, headers)
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
