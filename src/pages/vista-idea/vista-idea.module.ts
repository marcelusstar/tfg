import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaIdea } from './vista-idea';

@NgModule({
  declarations: [
    VistaIdea,
  ],
  imports: [
    IonicPageModule.forChild(VistaIdea),
  ],
  exports: [
    VistaIdea
  ]
})
export class VistaIdeaModule {}
