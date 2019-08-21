import { Injectable, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../models/user-interface';
import { MEAT_API } from '../../app.api';
import { of, Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Location } from '@angular/common';

const STORAGE_KEY = 'logged_in';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  public token: string;
  private url = 'http://10.35.3.116:3000/users';

  user: UserInterface;
  protected TOKEN_NAME = 'jwt_token';
  currentUser_perfil: string;
  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private httpClient: HttpClient
  ) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return (this.user !== undefined);
  }
  login(user_auth: UserInterface): Observable<any> {
    const body = JSON.stringify(user_auth);
    return this.httpClient.post(`${MEAT_API}/users/`, body, httpOptions)
      .pipe(
        map(user => {
          // login bem-sucedido se houver um token jwt na resposta
          this.storage.set(STORAGE_KEY, true);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.user = JSON.parse(sessionStorage.getItem('currentUser'));
          return user;
        })
      );
  }
  perfilUser(): string {
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   return currentUser['ds_perfil'];
  }

  isAuthenticated(): boolean {
    return this.storage.get(STORAGE_KEY);
  }

  resetUser(id_acesso: number, user: UserService) {
    const body = JSON.stringify(user);
    return this.httpClient.put(`${MEAT_API}/users/` + id_acesso, body, httpOptions);
  }

  recuperarSenha(email: string) {
    return this.httpClient.post(`${MEAT_API}/users/` + '0', email);
  }

  logout(): void {
    // Limpa o token removendo o usuário do local store para efetuar o logout
    this.token = null;
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('Menu');
    this.storage.set(STORAGE_KEY, false);
  }
}
