import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Utils from 'src/app/shared/utils/Utils';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
constructor(private router:Router,private authServ:AuthService){}


  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


  if(!this.authServ.isLogged()){
      this.router.navigate(['/login']);
    return false;
  }

  return !!Utils.isAdminRoute(state.url)?this.authServ.isAdmin():true;

  }
 
  
}
