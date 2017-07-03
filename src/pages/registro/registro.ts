import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage
{
  organizacionesSeleccionadas: string[] = [];
  organizaciones: any;
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
              private userService: UserService,
              private alertCtrl: AlertController)
  {
    this.getOrganizaciones();
  }

  public newUsuario()
  {
    if (this.organizacionesSeleccionadas.length > 0)
    {
      this.userService.newUsuario(this.usuario).then((result) =>
      {
        if (result != JSON.stringify({}))
        {
          this.cuentaCreada = true;
          this.showPopup("Exito", "Cuenta creada.");

          for(var i in this.organizacionesSeleccionadas)
          {
               console.log(this.organizacionesSeleccionadas[i]);
               this.addUsuarioAOrganizacion(this.usuario.alias, this.organizacionesSeleccionadas[i]);
          }
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
    else
    {
      this.showPopup("Error", "Necesita elegir al menos una organización");
    }
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

// -----------------------------------------------------------------------------

  getOrganizaciones()
  {
    this.userService.getOrganizaciones().then(organizaciones =>
    {
      this.organizaciones = organizaciones;
      console.log(this.organizaciones);
    });
  }

// -----------------------------------------------------------------------------

  addUsuarioAOrganizacion(alias_usuario, id_org)
  {
    var datos;

    datos = { alias: alias_usuario, id_organizacion: id_org};

    this.userService.addUsuarioAOrganizacion(datos).then(result =>
    {
      if (result != JSON.stringify({}))
      {
        console.log(datos);
      }
      else
      {
          this.showPopup("Error", "Ha ocurrido un problema mientras se asociaba la cuenta creada a la organizacion de id: "+id_org);
      }
      console.log(result);
    },
    (err) =>
    {
      this.showPopup("Error con la conexion, vuelva a intentarlo mas tarde", err);
      console.log(err);
    });
  }

}
