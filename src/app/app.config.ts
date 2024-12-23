import { ApplicationConfig, provideZoneChangeDetection, TransferState } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { provideAngularSvgIcon, SvgLoader } from 'angular-svg-icon';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

// export function svgLoaderFactory(http: HttpClient, transferState: TransferState) {
//   return new SvgServerLoader('./assets/lang_ico', transferState);
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // provideAngularSvgIcon({
    //   loader: {
    //     provide: SvgLoader,
    //     useFactory: svgLoaderFactory,
    //     deps: [ HttpClient, TransferState ],
    //   }
    // }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ]
};
