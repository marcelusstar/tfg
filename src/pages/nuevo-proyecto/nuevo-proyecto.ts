import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ProyectoService } from '../../providers/proyecto-service';

/**
 * Generated class for the NuevoProyecto page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nuevo-proyecto',
  templateUrl: 'nuevo-proyecto.html',
})
export class NuevoProyectoPage {

  loading: Loading;
  proyecto =
  {
    nombre: '',
    descripcion: '',
    usuario_alias : 'guille'
  }

  proyectoCreado = false;

  constructor(
              private nav: NavController,
              private proyectoService: ProyectoService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController)
  {

  }

// -----------------------------------------------------------------------------

  public creaProyecto(usuario)
  {
    this.showLoading();
    this.proyectoService.newProyecto(this.proyecto).then((result)=>
    {
      if (JSON.stringify(result) != JSON.stringify([]))
      {
        this.nav.setRoot('HomePage');
        console.log(this.proyecto);
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
