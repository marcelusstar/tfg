import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaIdeaPage } from './nueva-idea';

@NgModule({
  declarations: [
    NuevaIdeaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaIdeaPage),
  ],
  exports: [
    NuevaIdeaPage
  ]
})
export class NuevaIdeaModule {}
