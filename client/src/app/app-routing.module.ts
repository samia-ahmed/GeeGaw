import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginregComponent } from './loginreg/loginreg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';

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
  },
  {
    path:'search',
    pathMatch:'full',
    component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
