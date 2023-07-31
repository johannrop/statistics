import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuardFtn } from './guards/auth-fn.guard';
import { authGuardHd } from './guards/auth-fn.guard';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'app-login',
    pathMatch:'full'},
  {
    path:'app-login', 
    component:LoginComponent
  },
  {
    path:'app-header', 
    component:HeaderComponent,
    canActivate: [authGuardHd]
  },
  {
    path:'app-dashboard',
    component:DashboardComponent, 
    canActivate: [authGuardFtn]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
