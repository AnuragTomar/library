import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardLogin implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.loggedIn;
  }
/*canActivate is the interface that decides whether the path should be activated. in above case loggedIn is a boolean variable in auth.service.ts which returns true or false based on login status. and then canActivate decides to activate or stop the route*/

}
