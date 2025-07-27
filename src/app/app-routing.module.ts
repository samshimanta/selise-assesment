import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioListComponent } from './@pages/studio-list/studio-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/studio-list', pathMatch: 'full'},
  { path: 'studio-list', component: StudioListComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
