import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoProyectoPage } from './nuevo-proyecto';

@NgModule({
  declarations: [
    NuevoProyectoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoProyectoPage),
  ],
  exports: [
    NuevoProyectoPage
  ]
})
export class NuevoProyectoModule {}
