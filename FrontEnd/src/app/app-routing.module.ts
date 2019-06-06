import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
const appRoutes: Routes = [
  {path: 'register', component : RegisterComponent, canActivate : ['CanAlwaysActivateGuard'] },
  {path: 'login', component : LoginComponent ,canActivate : ['CanAlwaysActivateGuard']},
  {path : 'profile', component :EditProfileComponent, canActivate: ['CanAppUserActivateGuard']}


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
