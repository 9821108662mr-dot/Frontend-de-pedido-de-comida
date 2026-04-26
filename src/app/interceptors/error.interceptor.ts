import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastSvc = inject(ToastService);

  return next(req).pipe(
    // Retry failing requests up to 2 times, with 1 second delay between retries
    retry({
      count: 2,
      delay: (error, retryCount) => {
        // Don't retry on 4xx client errors
        if (error.status >= 400 && error.status < 500) {
          return throwError(() => error);
        }
        return timer(1000);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMsg = 'Error desconocido en la conexión.';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMsg = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 0) {
          errorMsg = 'Error de conexión. Verifica tu internet o el servidor no responde.';
        } else {
          errorMsg = `Error del Servidor (${error.status}): No se pudo cargar la información.`;
        }
      }
      toastSvc.show(errorMsg, 'error');
      return throwError(() => error);
    })
  );
};
