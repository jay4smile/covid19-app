import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ErrorDialogService } from './ErrorDialog.service';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private errorDialogService: ErrorDialogService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');
        const reason = 'reason';
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({headers: request.headers.set('Access-Control-Allow-Origin', '*')});


        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            retry(1),
             catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                if (error.status === 401) {
                    data[reason] = 'Unauthorize access';
                }
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }

}
