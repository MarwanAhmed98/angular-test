import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // const platformId = inject(PLATFORM_ID);
  // // const isBrowser = isPlatformBrowser(platformId);

  // if (isPlatformBrowser(platformId)) {
  //   if(localStorage.getItem('token')! == null){
  //     req = req.clone({
  //       setHeaders: {
  //         token: localStorage.getItem('token')!
  //       }
  //     });
  //   }
  // }


  const pLATFORM_ID = inject(PLATFORM_ID)

  if(isPlatformBrowser(pLATFORM_ID)){
    if(localStorage.getItem("token") !== null){



      req = req.clone({
        setHeaders:{token:localStorage.getItem("token") !}
      })



    }
  }




  return next(req);
};
