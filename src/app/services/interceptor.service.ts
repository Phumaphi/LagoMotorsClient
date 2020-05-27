import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorTracker } from '../interface/ErrorTracker';
import { tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackbar: MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any | ErrorTracker>> {

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            // http response status code
            this.snackbar.open(event.statusText, 'dismiss', {
              verticalPosition: this.verticalPosition,
            horizontalPosition: this.horizontalPosition,
          duration: 1000, });
          }
        }, error => {
          // http response status code
          const message = this.myfunctiom(error);
          console.log('show error message');
          // show error snackbar with red background
          this.snackbar.open(message, 'dismiss', {
            verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
        duration: 20000,
      panelClass: 'red-snackbar'});

        })
      );


  }
  private myfunctiom(err: HttpErrorResponse): string {
    const dataError = new ErrorTracker();
    //  dataError.errorNumber = 100;
    dataError.message = err.statusText;
    dataError.friendlyMessage = 'An error accured';
    dataError.statusMessage = `${dataError.message},  ` + `${dataError.friendlyMessage}`;
    return dataError.statusMessage;
  }
}

