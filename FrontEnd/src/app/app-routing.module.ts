import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
<<<<<<< HEAD
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {PriceListComponent} from './price-list/price-list.component';
import { CanActivateAdmin } from './guard/CanActivateAdmin';
const appRoutes: Routes = [
  {path: 'register', component : RegisterComponent, canActivate : ['CanAlwaysActivateGuard'] },
  {path: 'login', component : LoginComponent ,canActivate : ['CanAlwaysActivateGuard']},
  {path : 'profile', component :EditProfileComponent, canActivate: ['CanAppUserActivateGuard']},
  {path: 'pricelist', component:PriceListComponent, canActivate: [CanActivateAdmin] }
=======
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'
const appRoutes: Routes = [
  {path: 'register', component : RegisterComponent },
  {path: 'login', component : LoginComponent }


>>>>>>> parent of d8d28e1... user can now change his/her password
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
