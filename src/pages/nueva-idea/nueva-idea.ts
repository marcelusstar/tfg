import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, NavParams } from 'ionic-angular';
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

  idea_madre = null;

  idea =
  {
    descripcion : '',
    nivel : '1',
    Idea_id_madre : null,
    Idea_id_origen : null,
    Proyecto_id : '2',
    Usuario_alias_autor : 'guille'
  }

  ideaCreada = false;

  constructor(
              private nav: NavController,
              private navParams: NavParams,
              private ideaService: IdeaService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController)
  {
    this.idea_madre =  this.navParams.data;
    console.log(this.idea_madre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaIdea');
  }

// -----------------------------------------------------------------------------

  public creaIdea(usuario)
  {

    if (this.idea_madre.id != null && this.idea_madre.id != '')
    {
      this.idea.nivel = this.idea_madre.nivel + 1;

      this.idea.Idea_id_madre = this.idea_madre.id;
      if (this.idea_madre.idOrigen == null)
      {
        this.idea.Idea_id_origen = this.idea_madre.id;
      }
      else
      {
        this.idea.Idea_id_origen = this.idea_madre.idOrigen;
      }
    }

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
        this.showError("Datos incorrectos");
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
