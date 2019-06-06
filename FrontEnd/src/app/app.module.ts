import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { TokenInterceptorService } from 'src/app/token/token-interceptor.service';
<<<<<<< HEAD
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CanActivateAdmin } from './guard/CanActivateAdmin';
import { PriceListComponent } from './price-list/price-list.component';
=======
>>>>>>> parent of d8d28e1... user can now change his/her password

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
<<<<<<< HEAD
    LoginComponent,
    EditProfileComponent,
    PriceListComponent
=======
    LoginComponent
>>>>>>> parent of d8d28e1... user can now change his/her password
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    HttpClientXsrfModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
