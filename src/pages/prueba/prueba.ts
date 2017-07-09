import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Prueba page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prueba',
  templateUrl: 'prueba.html',
})
export class Prueba
{

  RADIO_CIRCULO_INICIAL = 5;

// -----------------------------------------------------------------------------

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {

  }

// -----------------------------------------------------------------------------

  ionViewDidLoad() {
    console.log('ionViewDidLoad Prueba');
    this.dibujaCirculo();
    this.crearCanvas();
    this.ocultarMenuFlotante();
  }

// -----------------------------------------------------------------------------

  dibujaCirculo()
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(50,50,5,0,2*Math.PI);//arc(x,y,r,startangle,endangle)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

/*
    canvas.addEventListener('click', function (e) {
      console.log('Evento');

      var menu_flotante = document.getElementById("menu_flotante");

      menu_flotante.style.display = "block"

      puntoDentroCirculo(x_circulo, y_circulo, radio, x_click, y_click);
    });
    */
  }

// -----------------------------------------------------------------------------

  dibujaCirculoPequeno(event)
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(95,50,40,0,2*Math.PI);//arc(x,y,r,startangle,endangle)
    ctx.stroke();
  }

// -----------------------------------------------------------------------------

  crearCanvas()
  {
    var canvas = document.createElement("canvas");
    canvas.height = 50;
    canvas.width = 50;
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(100,100,5,0,2*Math.PI);//arc(x,y,r,startangle,endangle)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    var proyecto = document.getElementById("div_proyecto");
    proyecto.appendChild(canvas);

  }

// -----------------------------------------------------------------------------

  posicionRaton(e)
  {
    e = e || window.event;

    var canvas = <HTMLCanvasElement>document.getElementById('circulo');

    var rect = canvas.getBoundingClientRect();

    var x_click = e.clientX - rect.left;
    var y_click = e.clientY - rect.top;

    console.log(x_click + ' ' + y_click);

    var punto_dentro_circulo = this.puntoDentroCirculo(50, 50, this.RADIO_CIRCULO_INICIAL, x_click, y_click)

    if (punto_dentro_circulo == true)
    {
      console.log('esta dentro del circulo');
      this.mostrarMenuFlotante();
    }
    else
    {
      console.log('esta fuera del circulo');
      this.ocultarMenuFlotante();
    }
  }

// -----------------------------------------------------------------------------

  mostrarMenuFlotante()
  {
    var menu_flotante = document.getElementById("menu_flotante");

    menu_flotante.style.display = "block"
  }

// -----------------------------------------------------------------------------

  ocultarMenuFlotante()
  {
    var menu_flotante = document.getElementById("menu_flotante");

    menu_flotante.style.display = "none"
  }

// -----------------------------------------------------------------------------

  public createIdea()
  {
    console.log('createIdea');
    this.navCtrl.push('NuevaIdeaPage');
  }

// -----------------------------------------------------------------------------

  puntoDentroCirculo(x_circulo, y_circulo, radio, x_click, y_click)
  {
    var distancia_click_centro_circulo;
    var esta_dentro;

    distancia_click_centro_circulo = Math.sqrt((x_click-x_circulo)*(x_click-x_circulo) + (y_click-y_circulo)*(y_click-y_circulo));

    if (distancia_click_centro_circulo <= radio)
      esta_dentro = true;
    else
      esta_dentro = false;

    return esta_dentro;
  }

}
