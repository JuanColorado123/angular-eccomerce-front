import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { User } from '@auth/interfaces/users.interfaces';
import { AuthResponse } from '@auth/interfaces/authResponse.interface';

import { environment } from 'src/environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';


type AuthStatus  = 'checking' | 'authenticated' |'not-authenticated';
const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>( localStorage.getItem('token'));
  private _rolesUser = signal<string[] | null>(null);

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader : () => this.checkStatus(),
  })

  authStatus = computed(() => {
    if(this._authStatus() === 'checking') return 'checking';

    if(this._user()){
      return 'authenticated'
    }
    return 'not-authenticated'
  });

  user = computed<User | null >(() => this._user());
  token = computed(() => this._token());
  userRoles = computed<string[] | null>(() => this._rolesUser())

  login(email: string, password: string): Observable<boolean>{

    return this.http.post<AuthResponse>(`${ baseUrl }/auth/login`,{
      email : email,
      password : password,
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  register (email: string, fullName: string, password: string ): Observable<boolean>{

    return this.http.post<AuthResponse>(`${ baseUrl }/auth/register`, {
      email: email,
      fullName: fullName,
      password: password
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }
  checkStatus(): Observable<boolean>{
    const token = localStorage.getItem('token');

    if(!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${ baseUrl }/auth/check-status`,{
      // headers : {
      //   Authorization : `Bearer ${ token }`
      // },
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  logout(){
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    this._rolesUser.set(null)

    localStorage.removeItem('token')
  }

  private handleAuthSuccess({token, user}: AuthResponse){
    this._token.set(token);
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._rolesUser.set(user.roles)

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any){
    this.logout()
    return of(false)
  }
}
