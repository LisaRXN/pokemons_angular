import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


export interface Credentials {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private router = inject(Router)
  private http = inject(HttpClient)
  private BASE_URL = 'http://localhost:3000/pokemons'

  user = signal<User | null | undefined>(undefined)

  login(credentials: Credentials): Observable<User | null | undefined> {
    console.log('Envoi de la requête avec credentials :', credentials);

  return this.http
    .post(this.BASE_URL + '/auth/login', credentials)
    .pipe( 
      tap( (result: any) => {
      console.log('Réponse de l\'API :', result);
      localStorage.setItem('token', result['token'])
      const user = Object.assign( new User(), result['user'] )
      this.user.set( user )
      }),
      map( (result:any) => {
        const user = this.user()
        return user;
      })
    )
  }
  
  register(credentials: Credentials): Observable<User | null | undefined> {
    console.log('Envoi de la requête avec credentials :', credentials);

    return this.http.post(this.BASE_URL + '/auth/register', credentials).pipe(
      tap((result: any) => {
        console.log('Réponse de l\'API :', result);
        this.router.navigate(['login']);
      })
    );
  }
  

  getUsers(): Observable<User | null | undefined>{
    return this.http
    .get(this.BASE_URL + '/auth/me')
    .pipe(
      tap( (result: any) => {
        const user = Object.assign( new User(), result )
        this.user.set( user )
      }),
      map( (result: any) => {
        return this.user()
      })
    )
  }

  logout(): Observable<null>{
    return this.http
    .get(this.BASE_URL + '/auth/logout')
    .pipe(
      tap( (result: any) => {
        localStorage.removeItem('token');
        this.user.set(null)
      })
    )
  }

}
