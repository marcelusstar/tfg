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

  nodo =
  {
     id : null,
     idMadre : null,
     x : 0,
     y : 0,
     nivel : 0,
     votos : 0,
     hijos: [] = []
   };

   arbol =
   {
     id : 1,
     idMadre : null,
     x : 0,
     y : 0,
     nivel : 0,
     votos : 0,
     hijos:
     [
       {id : 2, idMadre : 1, x : 0, y : 0, nivel : 1, votos : 0,
         hijos: []
       },
       {id : 3, idMadre : 1, x : 0, y : 0, nivel : 1, votos : 0,
         hijos:
         [
           {id : 8, idMadre : 3, x : 0, y : 0, nivel : 2, votos : 0, hijos: null},
           {id : 9, idMadre : 3, x : 0, y : 0, nivel : 2, votos : 0, hijos: null},
           {id : 10, idMadre : 3, x : 0, y : 0, nivel : 2, votos : 0,
             hijos: 
             [
               {id : 14, idMadre : 10, x : 0, y : 0, nivel : 3, votos : 0, hijos: null},
               {id : 15, idMadre : 10, x : 0, y : 0, nivel : 3, votos : 0, hijos: null},
               {id : 16, idMadre : 10, x : 0, y : 0, nivel : 3, votos : 0, hijos: null}
            ]}
        ]},
       {id : 4, idMadre : 1, x : 0, y : 0, nivel : 1, votos : 0,
         hijos:
         [
           {id : 11, idMadre : 4, x : 0, y : 0, nivel : 2, votos : 0, hijos: null},
           {id : 12, idMadre : 4, x : 0, y : 0, nivel : 2, votos : 0, hijos: null},
           {id : 13, idMadre : 4, x : 0, y : 0, nivel : 2, votos : 0, hijos: null}
        ]}
      ]
   }

   nexts = [0, 0, 0, 0];
   offset = [0, 0, 0, 0];

// -----------------------------------------------------------------------------

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {

  }

// -----------------------------------------------------------------------------

  ionViewDidLoad() {
    console.log('ionViewDidLoad Prueba');
    //this.dibujaCirculo(50, 50, 5);
    this.crearCanvas();
    this.ocultarMenuFlotante();
    this.dibujaArbol(this.arbol);
    this.dibujaRamasArbol(this.arbol);
  }

// -----------------------------------------------------------------------------

  dibujaCirculo(x, y, r)
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);//arc(x,y,r,startangle,endangle)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
  }

// -----------------------------------------------------------------------------

  dibujaLinea(x1, y1, x2, y2)
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2,y2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
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
      this.dibujaArbol(this.arbol);
    }
    else
    {
      console.log('esta fuera del circulo');
      this.ocultarMenuFlotante();
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.nexts = [0, 0, 0];
      this.offset = [0, 0, 0];
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

// -----------------------------------------------------------------------------

  dibujaArbol(arbol)
  {
    var place, num_hijos, s;

    num_hijos = 0;

    for (var hijo in arbol.hijos)
    {
      num_hijos += 1;
      this.dibujaArbol(arbol.hijos[hijo]);
    }

    arbol.y = arbol.nivel * 100;

    if (arbol.hijos == null || num_hijos == 0)
    {
      place = this.nexts[arbol.nivel];
      arbol.x = place + 100;
    }
    else if (num_hijos == 1)
    {
      place = arbol.hijos[0].x - 1;
    }
    else
    {
      s = arbol.hijos[0].x + arbol.hijos[num_hijos - 1].x;
      place = s / 2;
    }

    this.offset[arbol.nivel] = Math.max(this.offset[arbol.nivel], this.nexts[arbol.nivel] - place);

    if (arbol.hijos != null)
    {
      arbol.x = place + this.offset[arbol.nivel];
    }

    this.nexts[arbol.nivel] += 100;

    this.dibujaCirculo(arbol.x, arbol.y, 5);

    console.log("id " + arbol.id);
    console.log("X " + arbol.x);
    console.log("Y " + arbol.y);
    console.log("------------------------------");
  }

// -----------------------------------------------------------------------------

  dibujaRamasArbol(arbol, x_origen = null, y_origen = null)
  {
    var place, num_hijos, s;

    num_hijos = 0;

    for (var hijo in arbol.hijos)
    {
      num_hijos += 1;
      this.dibujaRamasArbol(arbol.hijos[hijo], arbol.x, arbol.y);
    }

    if (x_origen != null && y_origen != null)
      this.dibujaLinea(x_origen, y_origen, arbol.x, arbol.y);
  }

}
