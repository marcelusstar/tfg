import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IdeaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IdeaService
{
  data: any;
  apiUrl = 'http://localhost:3000/ideas';

  constructor(public http: Http)
  {
    console.log('Hello IdeaService Provider');
  }

// IDEAS
// -----------------------------------------------------------------------------

    getIdeas()
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

    getIdea(id)
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

    getIdeasProyecto(id_proyecto)
    {
      if (this.data)
      {
        return Promise.resolve(this.data);
      }

      return new Promise(resolve =>
      {
        this.http.get(this.apiUrl + '/proyecto/' + id_proyecto)
          .map(res => res.json())
          .subscribe(data =>
          {
            this.data = data;
            resolve(this.data);
          });
      });
    }
// -----------------------------------------------------------------------------

    newIdea(data)
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
