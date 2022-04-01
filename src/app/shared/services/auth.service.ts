import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";
import {IGenericResponse} from "../models/generic-response.model";

export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';

@Injectable()
export class AuthService {
  private _user: IUser | null = null;

  get loggedIn(): boolean {
    const token = localStorage.getItem('token_id');
    const getUser = JSON.parse(localStorage.getItem('user-data') ?? '{}');

    if (getUser != undefined && this._user == null) {
      this._user = {
        avatarUrl: getUser.avatarUrl,
        email: getUser.email
      }
    }

    return token != undefined;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) {
  }

  async logIn(email: string, password: string) {

    try {
      // Send request
      const query = this.http.post<IGenericResponse>(`${environment.webApi}/account`, {
        usuario: email,
        password: password
      });
      const result = await lastValueFrom(query);
      console.log(result);

      if (result.success) {
        this._user = {
          avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png',
          email: result.data.dbUser.nombrePersonal
        };

        localStorage.setItem('token_id', result.data.token);
        localStorage.setItem('user-data', JSON.stringify({
          avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png',
          email: result.data.dbUser.nombrePersonal
        }))
      }

      this.router.navigate([this._lastAuthenticatedPath]);

      return {
        isOk: result.success,
        data: this._user,
        message: result.message === '' && 'Credentials are invalid'
      };
    } catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    } catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
    ;
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    localStorage.clear();
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
