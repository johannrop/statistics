import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'app-login',pathMatch:'full'},
  {path:'app-login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  correo: string = '';
  pass: string = '';
  @ViewChild('correoInput') correoInput!: ElementRef;
  @ViewChild('passInput') passInput!: ElementRef;
 }
