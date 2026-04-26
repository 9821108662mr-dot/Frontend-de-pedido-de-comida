import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  if (authSvc.currentUser()) {
    return true;
  }

  return router.parseUrl('/login');
};
