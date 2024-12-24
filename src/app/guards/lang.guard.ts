import { CanActivateFn } from '@angular/router';

export const LangGuard: CanActivateFn = (route, state) => {
  return true;
};
