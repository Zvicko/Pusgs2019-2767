import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateAdmin implements CanActivate {

  constructor() {}

  canActivate() {
    if(localStorage.role == "Admin"){
        return true;
    }
    else{
        return false;
    }
  }
}