import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionProyectos } from './seleccion-proyectos';

@NgModule({
  declarations: [
    SeleccionProyectos,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionProyectos),
  ],
  exports: [
    SeleccionProyectos
  ]
})
export class SeleccionProyectosModule {}
