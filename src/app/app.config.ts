import { DefaultLangChangeEvent } from './../../node_modules/@ngx-translate/core/lib/translate.service.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
 import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
 import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(withFetch(),withInterceptors([headersInterceptor,loadingInterceptor,errorInterceptor])), provideAnimations(), provideToastr(),
  importProvidersFrom(NgxSpinnerModule , TranslateModule.forRoot({
    defaultLanguage:'en',
    loader:{
      provide:TranslateLoader,
      useFactory:HttpLoaderFactory,
      deps:[HttpClient]
    }
  })),
  importProvidersFrom([SweetAlert2Module.forRoot()])]
};
