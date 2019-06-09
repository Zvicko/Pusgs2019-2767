import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AdminPricelistComponent} from './admin-pricelist/admin-pricelist.component';
import { CanActivateAdmin } from './guard/CanActivateAdmin';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
const appRoutes: Routes = [
  {path: 'register', component : RegisterComponent, canActivate : ['CanAlwaysActivateGuard'] },
  {path: 'login', component : LoginComponent ,canActivate : ['CanAlwaysActivateGuard']},
  {path : 'profile', component :EditProfileComponent, canActivate: ['CanAppUserActivateGuard']},
  {path: 'admin_pricelist', component: AdminPricelistComponent, canActivate: [CanActivateAdmin]},
  {path: 'ticket', component: BuyTicketComponent, canActivate: ['CanAppUserActivateGuard']}

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
