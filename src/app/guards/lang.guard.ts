import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Langs } from '@app/enums/languages.enum';

export const LangGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const lang = route.params['lang'];
  const isLangExist = Langs.some(langObj => langObj.code === lang);

  if(isLangExist) {
    return true;
  }
  router.navigate(['/en']);
  return false;
};
