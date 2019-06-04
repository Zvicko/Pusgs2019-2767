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
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe();
  }

  ngOnInit() {
    this.getUserRole();
  }
  getUserRole()
  {
    this.userRole=localStorage.getItem("role");
  }

  isLoggedIn()
  {
    return !!localStorage.jwt;

  }
  logOut()
  {

    localStorage.clear();
  }


}
