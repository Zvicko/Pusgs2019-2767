import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { TokenInterceptorService } from 'src/app/token/token-interceptor.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CanActivateAdmin } from './guard/CanActivateAdmin';
import { AdminPricelistComponent } from './admin-pricelist/admin-pricelist.component';
import { TicketComponentComponent } from './ticket-component/ticket-component.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { AdminTimetableComponent } from './admin-timetable/admin-timetable.component';
import { AdminStationComponent } from './admin-station/admin-station.component';
import { ControllerUsersComponent } from './controller-users/controller-users.component';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { LineMeshComponent } from './line-mesh/line-mesh.component';
import { BusRealtimeComponent } from './bus-realtime/bus-realtime.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    EditProfileComponent,
    AdminPricelistComponent,
    TicketComponentComponent,
    BuyTicketComponent,
    AdminTimetableComponent,
    AdminStationComponent,
    ControllerUsersComponent,
    TimetableListComponent,
    LineMeshComponent,
    BusRealtimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    HttpClientXsrfModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [ CanActivateAdmin,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide:'CanAlwaysActivateGuard',
      useValue: () => {
        return true;
      }
    },
    {
      provide:'CanAppUserActivateGuard',
      useValue: () => { if(localStorage.role =='AppUser')
        return true;
      }
    },
    {
      provide: 'CanControllerActivateGuard',
      useValue: () => {if(localStorage.role == "Controller")
        return true;
      }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
