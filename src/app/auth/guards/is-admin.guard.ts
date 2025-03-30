import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { User } from '@auth/interfaces/users.interfaces';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  await firstValueFrom(authService.checkStatus());

  const roles =  authService.userRoles();

  if(!roles) {
    router.navigateByUrl('/')
    return false;
  }

  if (roles.includes('admin')) {
    return true;
  }

  router.navigateByUrl('/')
  return false;
}
