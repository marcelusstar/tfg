import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProyectoService } from '../../providers/proyecto-service';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the Proyectos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-proyectos',
  templateUrl: 'proyectos.html',
})
export class ProyectosPage {

  alias_usuario = '';
  usuario_logueado = false;
  proyectos : any;
  /*
  estructura :
  {
    id : '';
    nombre,
    descripcion,
    anonimato
    fecha_inicio
    fecha_fin
    Usuario_alias_autor
  }
  */

  constructor(public navCtrl: NavController, public navParams: NavParams, private proyectoService: ProyectoService, private userService: UserService)
  {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyectos');
  }

  ionViewDidEnter()
  {
    this.alias_usuario = this.userService.aliasUsuarioLogueado();
    console.log(this.alias_usuario);
    this.getProyectrosUsuario(this.alias_usuario);
  }

// -----------------------------------------------------------------------------

  getProyectrosUsuario(usuario)
  {
    this.proyectoService.getProyectosUsuario(usuario).then((result)=>
    {
        this.proyectos = result;
        console.log(result);
    },
      (err) =>
      {
      console.log(err);
      //this.showError("Ha ocurrido un error con la conexion, vuelva a intentarlo más tarde");
    });
  }


  // -----------------------------------------------------------------------------

    borrarVistaHija()
    {
      var h = this.navCtrl.getActiveChildNav();

      this.navCtrl.removeView(h, null);
    }

// -----------------------------------------------------------------------------

  verProyecto(proyecto_elegido)
  {
    var contador;
    /*
    console.log("verProyecto");
    console.log(proyecto);
    console.log(proyecto.id);
    console.log(proyecto.nombre);
    */
    contador = 0;
    if (contador > 0)
        this.borrarVistaHija();

    this.navCtrl.push('Prueba', proyecto_elegido);
    contador++;
    //this.navCtrl.removeView('Prueba');

    //var h = this.navCtrl.getActiveChildNav();


  }

// -----------------------------------------------------------------------------

  public createProyecto()
  {
    this.navCtrl.push('NuevoProyectoPage');
  }

}
