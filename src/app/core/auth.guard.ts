import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn = false; // à remplacer par une vraie logique si besoin

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn) {
      return true;
    }
    alert('Accès refusé. Veuillez vous connecter.');
    this.router.navigate(['/']);
    return false;
  }
}
