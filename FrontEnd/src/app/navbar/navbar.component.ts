import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterModule,
  Routes,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userRole : string;
  s : string;
  status = {"0":"Odobren","1":"Odbijen","2":"U procesu"}
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe();
  }

  ngOnInit() {
    this.getUserRole();
    // this.getStatus();
  }
  getUserRole()
  {
    this.userRole=localStorage.getItem("role");
  }

  // getStatus()
  // {
  //   this.s = localStorage.getItem("Verified");
  // }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }
  }
  isInStatus()
  {
    this.s = localStorage.getItem("Verified");
    status[this.s];
    return true;
  }

  isLoggedIn()
  {
    return !!localStorage.jwt;

  }
  logOut()
  {

    localStorage.clear();
    this.router.navigateByUrl('login');
  }

 
}
window.addEventListener('storage', function(e){});