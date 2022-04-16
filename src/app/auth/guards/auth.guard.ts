import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  private authFunction() {
    return this.authservice.verificaAutentificacion()
    .pipe(
      tap( estaAutentificado => {
        if( !estaAutentificado ) {
          this.router.navigate(['./auth/login'])
        }
      })
    )
  }

  //canActiva restringe que los usuarios no autorizados puedan entrar
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      console.log('Bloqueado por el AuthGuard - CanActivate');
      return this.authFunction();
  }

  //canLoad solo restringe que se pueda cargar el módulo
  //si el módulo ya estaba cargado me dejará acceder
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      console.log('Bloqueado por el AuthGuard - CanLoad');
      return this.authFunction();
  }

}
