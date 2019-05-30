import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'
const appRoutes: Routes = [
  {path: 'register', component : RegisterComponent },
  {path: 'login', component : LoginComponent }


]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)//,
    // CommonModule
  ],
  // declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
