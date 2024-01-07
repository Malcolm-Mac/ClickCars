import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/vehiclesInterface';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {InforDataService} from '../service/infor-data.service'
@Injectable({
  providedIn: 'root'
})

export class AuthenticationServiceService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public userInfor: any[];

  constructor(private http: HttpClient, private infor:InforDataService ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(sessionStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  setUserAnthentication(userID:any, userName:string)
  {
    this.currentUserSubject.next(userID);
    sessionStorage.setItem('currentUser', userID);
    sessionStorage.setItem('currentUsername', userName);
  }
  login(username: string, password: string) {

    return this.http.get<any>(`${environment.apiUrl}password=` + password + "&Email=" + username)
      .pipe(map(user => {
        if (user && user.UserDetails.length > 0) {
          sessionStorage.setItem('currentUser', JSON.stringify(user.UserDetails[0].USERID));
          sessionStorage.setItem('currentUsername', JSON.stringify(user.UserDetails[0].NAME));
          this.infor.setUserId(JSON.stringify(user.UserDetails[0].USERID))
          this.currentUserSubject.next(user.UserDetails[0].USERID);
        }

        return user;
      }),
        retry(0),
        catchError(this.handleError)
      )

  }

  register(user: User) {
    let body = {
      name: user.firstName,
      surname: user.lastName,
      email: user.username,
      contact: user.phone,
      password: user.password,
      websiteID: "39"
    }

    return this.http.post<any>(`https://imageprocessing.e-dealerportal.co.za/api/UserRegister`,body)
      .pipe(map(res => {

      }),
        retry(0),
        catchError(this.handleError)
      );
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUsername');
    sessionStorage.clear();
    this.currentUserSubject.next(null!);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



}
