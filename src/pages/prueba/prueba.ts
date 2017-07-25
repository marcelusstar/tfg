import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IdeaService } from '../../providers/idea-service';
import { UserService } from '../../providers/user-service';

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
  private proyecto;

  RADIO_CIRCULO_INICIAL = 5;
  ESPACIO_X_ENTRE_NODOS = 20;
  ESPACIO_Y_ENTRE_NODOS = 20;

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
   };

   ideas_bd = [];
   nexts = [];
   offset = [];
   max_y_niveles = [];

   NUMERO_NIVELES = 0;

   id_proyecto = 2;

   idea_seleccionada =
   {
      id : null,
      descripcion : '',
      votos : 0,
      nivel : 0,
      idMadre : null,
      idOrigen : null,
      alias_usuario: '',
      x : 0,
      y : 0,
      id_proyecto : 2
   };

   alias_usuario = '';

// -----------------------------------------------------------------------------

  constructor(public navCtrl: NavController, public navParams: NavParams, private ideaService: IdeaService, private userService: UserService)
  {
    console.log("Proyecto");
    console.log(this.proyecto);

    //window.location.reload();
    //this.obtenIdeasProyectoBD();
  }

// -----------------------------------------------------------------------------

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad Prueba');
    //this.dibujaCirculo(50, 50, 5);
    this.crearCanvas();
    this.ocultarMenuFlotante();
    //this.dibujaArbol(this.arbol);
    //this.dibujaRamasArbol(this.arbol);
    //this.maxNivelArbol();
    //this.obtenIdeasProyectoBD();
    this.mostrarMenuFlotante();
  }

  ionViewDidEnter()
  {
    this.alias_usuario = this.userService.aliasUsuarioLogueado();
    this.ideas_bd = [];
    this.obtenIdeasProyectoBD();
  }


  ionViewWillLeave()
  {
    console.log("Looks like I'm about to leave :(");
    this.borrarCanvas();
    this.ideas_bd = [];
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

  dibujaIdea(x, y, votos)
  {
    var radio;

    radio = this.RADIO_CIRCULO_INICIAL * (votos + 1);

    this.dibujaCirculo(x, y, radio);
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

    //console.log(x_click + ' ' + y_click);

    var punto_dentro_circulo = this.puntoDentroCirculo(50, 50, this.RADIO_CIRCULO_INICIAL, x_click, y_click)

    if (punto_dentro_circulo == true)
    {
      //console.log('esta dentro del circulo');
      this.mostrarMenuFlotante();
      this.dibujaArbol(this.arbol);
    }
    else
    {
      //console.log('esta fuera del circulo');
      this.ocultarMenuFlotante();
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.nexts = [0, 0, 0];
      this.offset = [0, 0, 0];
    }
  }

// -----------------------------------------------------------------------------

  borrarCanvas()
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.nexts = [0, 0, 0];
    this.offset = [0, 0, 0];
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
    //console.log('createIdea');
    this.navCtrl.push('NuevaIdeaPage', this.idea_seleccionada);
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
    var radio_arbol;

    num_hijos = 0;

    for (var hijo in arbol.hijos)
    {
      num_hijos += 1;
      this.dibujaArbol(arbol.hijos[hijo]);
    }

    radio_arbol = (arbol.votos + 1) * this.RADIO_CIRCULO_INICIAL;

    arbol.y = this.max_y_niveles[arbol.nivel];

    if (arbol.hijos == null || num_hijos == 0)
    {
      if (this.nexts[arbol.nivel] > this.nexts[arbol.nivel - 1])
        place = this.nexts[arbol.nivel];
      else
      {
        var nivel_actual : number;

        nivel_actual = arbol.nivel;

        place = this.nexts[nivel_actual - 1];
      }
      arbol.x = place + radio_arbol;
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

    if (arbol.hijos != null && num_hijos > 0)
    {
      arbol.x = place + this.offset[arbol.nivel];
    }

    this.nexts[arbol.nivel] = arbol.x + radio_arbol + this.ESPACIO_X_ENTRE_NODOS;

    this.dibujaCirculo(arbol.x, arbol.y, radio_arbol);
    this.sustituyeXYIdea(arbol.id, arbol.x, arbol.y);

    //console.log("id " + arbol.id);
    //console.log("X " + arbol.x);
    //console.log("Y " + arbol.y);
    //console.log("------------------------------");
  }

// -----------------------------------------------------------------------------

  dibujaRamasArbol(arbol, x_origen = null, y_origen = null)
  {
    var num_hijos;

    num_hijos = 0;

    for (var hijo in arbol.hijos)
    {
      num_hijos += 1;
      this.dibujaRamasArbol(arbol.hijos[hijo], arbol.x, arbol.y);
    }

    if (x_origen != null && y_origen != null)
      this.dibujaLinea(x_origen, y_origen, arbol.x, arbol.y);
  }

// -----------------------------------------------------------------------------

  obtenIdeasProyectoBD()
  {
    var lista_ideas;
    var i;

    this.proyecto = [];
    this.proyecto = this.navParams.data;

    this.idea_seleccionada.id_proyecto = this.proyecto.id;

    this.ideaService.getIdeasProyecto(this.proyecto.id).then(ideas =>
    {
      lista_ideas = ideas;
      //console.log('lista_ideas: ');
      //console.log(lista_ideas);

      for (i = 0; i < lista_ideas.length; i++)
      {
        var idea =
        {
           id : null,
           descripcion : '',
           votos : 0,
           nivel : 0,
           idMadre : null,
           idOrigen : null,
           alias_usuario: '',
           x : 0,
           y : 0,
        };


        idea.id = lista_ideas[i].id;
        idea.descripcion = lista_ideas[i].descripcion;
        idea.votos = lista_ideas[i].votos;
        idea.nivel = lista_ideas[i].nivel;
        idea.idMadre = lista_ideas[i].Idea_id_madre;
        idea.idOrigen = lista_ideas[i].Idea_id_origen;
        idea.alias_usuario = lista_ideas[i].Usuario_alias_autor;
        idea.x = 0;
        idea.y = 0;

        this.ideas_bd.push(idea);
      }

      console.log('ideas_bd: ');
      console.log(this.ideas_bd);

      this.iniciaEstructuraArbol();
    });
  }

// -----------------------------------------------------------------------------

  hijosIdea(id_idea)
  {
    var hijos = [];
    var i;

    for (var idea in this.ideas_bd)
    {
      if (this.ideas_bd[idea].idMadre == id_idea)
      {
        var idea_actual =
        {
           id : null,
           idMadre : null,
           x : 0,
           y : 0,
           nivel : 0,
           votos : 0
        };

        idea_actual.id = this.ideas_bd[idea].id;
        idea_actual.idMadre = this.ideas_bd[idea].idMadre;
        idea_actual.nivel = this.ideas_bd[idea].nivel;
        idea_actual.votos = this.ideas_bd[idea].votos;
        idea_actual.x = this.ideas_bd[idea].x;
        idea_actual.y = this.ideas_bd[idea].y;

        hijos.push(idea_actual);
      }
    }

    return hijos;
  }

// -----------------------------------------------------------------------------

  ideasBase()
  {
    var hijos = [];
    var i;

    for (var idea in this.ideas_bd)
    {
      if (this.ideas_bd[idea].idMadre == null || this.ideas_bd[idea].idOrigen == null )
      {
        var idea_actual =
        {
           id : null,
           idMadre : null,
           x : 0,
           y : 0,
           nivel : 0,
           votos : 0
        };

        idea_actual.id = this.ideas_bd[idea].id;
        idea_actual.idMadre = this.ideas_bd[idea].idMadre;
        idea_actual.nivel = this.ideas_bd[idea].nivel;
        idea_actual.votos = this.ideas_bd[idea].votos;
        idea_actual.x = this.ideas_bd[idea].x;
        idea_actual.y = this.ideas_bd[idea].y;

        hijos.push(idea_actual);
      }
    }

    return hijos;
  }

// -----------------------------------------------------------------------------

  construyeEstructuraArbol(hijos)
  {
      var i;
      var array_hijos = [];

      for (var hijo in hijos)
      {
        var arbol =
        {
           id : null,
           idMadre : null,
           x : 0,
           y : 0,
           nivel : 0,
           votos : 0,
           hijos: [] = []
        };

        var hijos_idea_actual : any;
        var num_hijos_idea_actual;

        arbol.id = hijos[hijo].id;
        arbol.idMadre = hijos[hijo].idMadre;
        arbol.x = hijos[hijo].x;
        arbol.y = hijos[hijo].y;
        arbol.nivel = hijos[hijo].nivel;
        arbol.votos = hijos[hijo].votos;

        hijos_idea_actual = this.hijosIdea(arbol.id);

        num_hijos_idea_actual = 0;
        for (var hijo_idea in hijos_idea_actual)
        {
          num_hijos_idea_actual++;
          break;
        }

        if (num_hijos_idea_actual > 0)
        {
          arbol.hijos = this.construyeEstructuraArbol(hijos_idea_actual);
        }
        else
        {
          arbol.hijos = [];
        }

        array_hijos.push(arbol);
      }

      return array_hijos;
  }

// -----------------------------------------------------------------------------

  public iniciaEstructuraArbol()
  {
    var hijos_idea_actual;

    var arbol =
    {
       id : null,
       idMadre : null,
       x : 0,
       y : 0,
       nivel : 0,
       votos : 0,
       hijos: [] = []
    };

    arbol.id = 0;
    arbol.idMadre = null;
    arbol.x = 0;
    arbol.y = 0;
    arbol.nivel = 0;
    arbol.votos = 0;

    hijos_idea_actual = this.ideasBase();

    //console.log('hijos_idea_actual: ');
    //console.log(hijos_idea_actual);

    arbol.hijos = this.construyeEstructuraArbol(hijos_idea_actual);

    //console.log('arbol construido: ');
    //console.log(arbol);

    //this.calculaMaxYNiveles();
    this.datosAuxiliaresIniciales();

    this.dibujaArbol(arbol);
    this.dibujaRamasArbol(arbol);
  }

// -----------------------------------------------------------------------------

  public borraCanvas()
  {
    var canvas = <HTMLCanvasElement>document.getElementById('circulo');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.nexts = [0, 0, 0, 0, 0];
    this.offset = [0, 0, 0, 0, 0];
  }

// -----------------------------------------------------------------------------
// REVISAR ESTE MODULO
  clickDentroAlgunaIdea(click_x, click_y)
  {
    for (var idea in this.ideas_bd)
    {
      var esta_dentro : boolean;
      var radio_idea;

      radio_idea = (this.ideas_bd[idea].votos + 1) * this.RADIO_CIRCULO_INICIAL;

      esta_dentro = this.puntoDentroCirculo(this.ideas_bd[idea].x, this.ideas_bd[idea].y, radio_idea, click_x, click_y);
      console.log('X,Y: ' + click_x , click_y);

      if (esta_dentro == true)
      {
        console.log('Esta dentro de la idea de id: ' + this.ideas_bd[idea].id);

        this.idea_seleccionada.id = this.ideas_bd[idea].id;
        this.idea_seleccionada.idOrigen = this.ideas_bd[idea].idOrigen;
        this.idea_seleccionada.nivel = this.ideas_bd[idea].nivel;
        console.log(this.idea_seleccionada);

        var canvas = <HTMLCanvasElement>document.getElementById('circulo');
        var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(this.ideas_bd[idea].x, this.ideas_bd[idea].y, radio_idea, 0, 2 * Math.PI);//arc(x,y,r,startangle,endangle)
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();

        break;
      }
      else
      {
        this.idea_seleccionada.id = null;
        var canvas = <HTMLCanvasElement>document.getElementById('circulo');
        var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(this.ideas_bd[idea].x, this.ideas_bd[idea].y, radio_idea, 0, 2 * Math.PI);//arc(x,y,r,startangle,endangle)
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
      }

    }
  }

// -----------------------------------------------------------------------------

  estaClickRatonDentroAlgunaIdea(e)
  {
    e = e || window.event;

    var canvas = <HTMLCanvasElement>document.getElementById('circulo');

    var rect = canvas.getBoundingClientRect();

    var x_click = e.clientX - rect.left;
    var y_click = e.clientY - rect.top;

    //console.log("X " + x_click);
    //console.log("Y " + y_click);

    this.clickDentroAlgunaIdea(x_click, y_click);
  }

// -----------------------------------------------------------------------------

  sustituyeXYIdea(id_idea, nueva_x, nueva_y)
  {
    for (var idea in this.ideas_bd)
    {
      if (this.ideas_bd[idea].id == id_idea)
      {
        this.ideas_bd[idea].x = nueva_x;
        this.ideas_bd[idea].y = nueva_y;
        break;
      }
    }
  }

// -----------------------------------------------------------------------------

  calculaMaxVotosIdeaNivel(nivel)
  {
    var votos_ideas_nivel = [];
    for (var idea in this.ideas_bd)
    {
      if (this.ideas_bd[idea].nivel == nivel)
      {
        var num_max_votos : number;
        num_max_votos = this.ideas_bd[idea].votos;
        votos_ideas_nivel.push(this.ideas_bd[idea].votos);
      }
    }

    console.log("Maximos voto del nivel: " + nivel);
    console.log(Math.max(...votos_ideas_nivel));
    return Math.max(...votos_ideas_nivel);
  }

// -----------------------------------------------------------------------------

  calculaMaxVotosNiveles()
  {
    var votos_niveles = [];

    for (var i = 1; i <= this.NUMERO_NIVELES; i++)
    {
      var max_votos_nivel ;

      max_votos_nivel = this.calculaMaxVotosIdeaNivel(i);

      votos_niveles.push(max_votos_nivel);
    }

    console.log("Maximos votos de los niveles");
    console.log(votos_niveles);

    return votos_niveles;
  }

// -----------------------------------------------------------------------------

  calculaMaxYNiveles()
  {
    var max_votos_nivel = [];

    max_votos_nivel = this.calculaMaxVotosNiveles();

    this.max_y_niveles.push(20);

    for (var i = 1; i <= this.NUMERO_NIVELES; i++)
    {
      var y_nivel;

      if (i == 1)
        y_nivel = this.ESPACIO_Y_ENTRE_NODOS + this.RADIO_CIRCULO_INICIAL * (max_votos_nivel[i - 1] + 1);
      else
        y_nivel = this.RADIO_CIRCULO_INICIAL * (max_votos_nivel[i - 2] + 1) + this.ESPACIO_Y_ENTRE_NODOS + this.RADIO_CIRCULO_INICIAL * (max_votos_nivel[i - 1] + 1);

      y_nivel += this.max_y_niveles[i - 1];
      this.max_y_niveles.push(y_nivel);
    }

    console.log(this.max_y_niveles);
  }

// -----------------------------------------------------------------------------

  maxNivelArbol()
  {
    this.ideaService.getMaxNivelProyecto(this.id_proyecto).then(resultado =>
    {
      this.NUMERO_NIVELES = resultado[0].max_nivel;
      console.log(this.NUMERO_NIVELES);
    });
  }

// -----------------------------------------------------------------------------

calculaMaxNivelArbol()
{
  var nivel_mayor;

  nivel_mayor = 0;

  for (var idea in this.ideas_bd)
  {
    if (this.ideas_bd[idea].nivel > nivel_mayor)
    {
      nivel_mayor = this.ideas_bd[idea].nivel;
    }
  }
  console.log('nivel mayor: ' + nivel_mayor);
  this.NUMERO_NIVELES = nivel_mayor;
}

// -----------------------------------------------------------------------------

  datosAuxiliaresIniciales()
  {
    var i;
/*
    this.nexts = [];
    this.offset = [];
    this.max_y_niveles = [];

    this.calculaMaxNivelArbol();
    console.log(this.NUMERO_NIVELES);

    for (i = 0; i < this.NUMERO_NIVELES; i++)
    {
      this.nexts.push(0);
      this.offset.push(0);
    }
    */

    this.nexts = [];
    this.offset = [];
    this.max_y_niveles = [];
    this.calculaMaxNivelArbol();

    for (i = 0; i < this.NUMERO_NIVELES; i++)
    {
      this.nexts.push(0);
      this.offset.push(0);
    }

    this.calculaMaxYNiveles();
  }

// -----------------------------------------------------------------------------

  goBack() {
    console.log("popping");
    this.navCtrl.pop();
  }

}
