import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginregComponent } from './loginreg/loginreg.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: LoginregComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
