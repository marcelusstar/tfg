import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios: any;
  usuario =
  {
    alias: 'asd',
    nombre: 'asd',
    apellidos: 'asd',
    contrasena: 'asd'
  };
  toppings =[];

  MyArrayType = {id: '', seleccionado: ''};
  toppings2 : any;

  constructor(public navCtrl: NavController, public apiService: ApiService)
  {
      this.usuarios = this.getUsuarios();
  }

  getUsuarios()
  {
    this.apiService.getUsuarios().then(data =>
    {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  newUsuario()
  {
    this.apiService.newUsuario(this.usuario).then((result) =>
    {
      console.log(result);
    },
      (err) =>
    {
    console.log(err);
  });
}

}
