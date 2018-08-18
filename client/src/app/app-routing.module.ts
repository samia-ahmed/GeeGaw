import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginregComponent } from './loginreg/loginreg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: LoginregComponent
  },
  {
    path:'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path:'create',
    pathMatch: 'full',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
