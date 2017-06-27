import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage
{
  usuario =
  {
    alias: '',
    nombre: '',
    apellidos: '',
    contrasena: ''
  };
  cuentaCreada = false;

  constructor(
              private nav: NavController,
              private apiService: ApiService,
              private alertCtrl: AlertController)
  {

  }

  public newUsuario()
  {
    this.apiService.newUsuario(this.usuario).then((result) =>
    {
      if (result != JSON.stringify({}))
      {
        this.cuentaCreada = true;
        this.showPopup("Exito", "Cuenta creada.");
      }
      else
      {
          this.showPopup("Error", "Ha ocurrido un problema mientras se creaba la cuenta");
      }
      console.log(result);
    },
    (err) =>
    {
      this.showPopup("Error con la conexion, vuelva a intentarlo mas tarde", err);
      console.log(err);
    });
  }

  showPopup(title, text)
  {
    let alert = this.alertCtrl.create(
    {
      title: title,
      subTitle: text,
      buttons:
      [
        {
          text: 'OK',
          handler: data =>
          {
            if (this.cuentaCreada == true)
            {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });

    alert.present();
  }
}
