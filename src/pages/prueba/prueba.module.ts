import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Prueba } from './prueba';

@NgModule({
  declarations: [
    Prueba,
  ],
  imports: [
    IonicPageModule.forChild(Prueba),
  ],
  exports: [
    Prueba
  ]
})
export class PruebaModule {}
