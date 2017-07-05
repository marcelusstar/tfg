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
export class Prueba {

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Prueba');
    this.dibujaCirculo();
    this.crearCanvas();
    this.ocultarMenuFlotante();
  }

  dibujaCirculo()
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(50,50,5,0,2*Math.PI);//arc(x,y,r,startangle,endangle)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    canvas.addEventListener('click', function (e) {
      console.log('Evento');

      var menu_flotante = document.getElementById("menu_flotante");

      menu_flotante.style.display = "block"
    });
  }

  dibujaCirculoPequeno(event)
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(95,50,40,0,2*Math.PI);
    ctx.stroke();
  }

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

  posicionRaton(e)
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');

    var rect = canvas.getBoundingClientRect();

    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    console.log(x + ' ' + y);

    if (x == 50 || y == 50)
    {
      console.log('vamooos');
    }
  }

  mostrarMenuFlotante()
  {
    var menu_flotante = document.getElementById("menu_flotante");

    menu_flotante.style.display = "block"
  }

  ocultarMenuFlotante()
  {
    var menu_flotante = document.getElementById("menu_flotante");

    menu_flotante.style.display = "none"
  }

}
