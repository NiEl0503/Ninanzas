import {ApplicationConfig} from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser'
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './app.config.server';
//import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot(appRoutes)
//   ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
};
