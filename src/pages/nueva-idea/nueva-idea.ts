import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { IdeaService } from '../../providers/idea-service';

/**
 * Generated class for the NuevaIdea page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nueva-idea',
  templateUrl: 'nueva-idea.html',
})
export class NuevaIdeaPage
{
  loading: Loading;

  idea =
  {
    descripcion : '',
    nivel : '2',
    Idea_id_madre : 1,
    Proyecto_id : '2',
    Usuario_alias_autor : 'guille'
  }

  ideaCreada = false;

  constructor(
              private nav: NavController,
              private ideaService: IdeaService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaIdea');
  }

// -----------------------------------------------------------------------------

  public creaIdea(usuario)
  {
    this.showLoading();
    this.ideaService.newIdea(this.idea).then((result)=>
    {
      if (JSON.stringify(result) != JSON.stringify([]))
      {
        console.log(this.idea);
        console.log(JSON.stringify([]));
        console.log(JSON.stringify(result));
        this.nav.pop();
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
