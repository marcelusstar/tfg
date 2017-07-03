import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage
{
  loading: Loading;
  usuario =  { alias: '', contrasena: ''};

  constructor(
              private nav: NavController,
              private userService: UserService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController)
  {

  }

// -----------------------------------------------------------------------------

  public createAccount()
  {
    this.nav.push('RegistroPage');
  }

// -----------------------------------------------------------------------------

  public loginUsuario(usuario)
  {
    this.showLoading();
    this.userService.loginUsuario(this.usuario).then((result)=>
    {
      if (JSON.stringify(result) != JSON.stringify([]))
      {
        this.nav.setRoot('HomePage');
        console.log(this.usuario);
        console.log(JSON.stringify([]));
        console.log(JSON.stringify(result));
      }
      else
      {
        this.showError("Datos incorretos");
      }
    },
      (err) =>
    {
      console.log(err);
      this.showError("Ha ocurrido un error con la conexion, vuelva a intentarlo más tarde");
    });
  }

// -----------------------------------------------------------------------------

  showLoading()
  {
    this.loading = this.loadingCtrl.create(
    {
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

// -----------------------------------------------------------------------------

  showError(text)
  {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
