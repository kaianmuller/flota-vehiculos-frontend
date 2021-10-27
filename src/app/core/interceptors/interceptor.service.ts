import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private readonly authServ:AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{


    const headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': 'Bearer '+ this.authServ.getToken()?.toString()
    });


    const reqClone = req.clone({headers});

    return next.handle(reqClone).pipe(
      catchError(this.captureError.bind(this))
    );

    
  }



  captureError(error:HttpErrorResponse){
    if(error.status == 403 || error.status == 401){
     console.log('no estas authorizado: interceptor');
    }else if(error.status == 0 || error.status == 404 || error.status == 500){
      console.log('No encontrado: interceptor');
    }
    return throwError(error);
  }

}
