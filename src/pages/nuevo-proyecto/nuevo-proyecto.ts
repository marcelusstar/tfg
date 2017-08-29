import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ProyectoService } from '../../providers/proyecto-service';
import { UserService } from '../../providers/user-service';

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
    anonimato: 0,
    fecha_inicio : '',
    fecha_fin : '',
    Usuario_alias_autor : ''
  }

  fecha = new Date(2010, 11, 28, 14, 57);

  alias_usuario = '';

  proyectoCreado = false;

  id_proyecto_creado = 0;

  constructor(
              private navCtrl: NavController,
              private proyectoService: ProyectoService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private userService: UserService)
  {
      this.alias_usuario = this.userService.aliasUsuarioLogueado();
      this.proyecto.Usuario_alias_autor = this.alias_usuario;
  }

// -----------------------------------------------------------------------------

  public creaProyecto(usuario)
  {
    this.showLoading();
    this.proyectoService.newProyecto(this.proyecto).then((result)=>
    {
      if (JSON.stringify(result) != JSON.stringify([]))
      {
        console.log(this.proyecto);
        console.log(JSON.stringify([]));
        console.log(JSON.stringify(result));
        this.ultimoProyecto();

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

// -----------------------------------------------------------------------------

  addUsuarioAProyecto()
  {
    var datos;

    //this.ultimoProyecto();

    datos = { Usuario_alias: this.alias_usuario, Proyecto_id: this.id_proyecto_creado};

    this.userService.addUsuarioAProyecto(datos).then(result =>
    {
      if (result != JSON.stringify({}))
      {
        console.log("proyecto creado");
        console.log(datos);
        this.navCtrl.pop();
      }
      else
      {
          this.showError("Ha ocurrido un problema mientras se asociaba la cuenta creada al proyecto de id: "+this.id_proyecto_creado);
          this.navCtrl.pop();
      }
      console.log(result);
    },
    (err) =>
    {
      this.showError("Error con la conexion, vuelva a intentarlo mas tarde");
      console.log(err);
      this.navCtrl.pop();
    });
  }

// -----------------------------------------------------------------------------

  ultimoProyecto()
  {
    this.proyectoService.getUltimoProyecto().then(devolucion =>
    {
      this.id_proyecto_creado = devolucion[0].max_id;
      console.log("proyecto creado id");
      console.log(devolucion);
      console.log(this.id_proyecto_creado);

      this.addUsuarioAProyecto();
    });


  }

}
