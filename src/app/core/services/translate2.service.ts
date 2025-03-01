import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class Translate2Service {

  constructor(private translateService:TranslateService ,
    @Inject(PLATFORM_ID) private platId:object ) {
 
     if(isPlatformBrowser(this.platId)){ 
          this.translateService.setDefaultLang('en')
          const savedLang  = localStorage.getItem('lang'); 
          if(savedLang){
            this.translateService.use(  savedLang  );
          }
          this.changeDirection()
     }
 
    }
 
 
    changeDirection():void {
     if(localStorage.getItem('lang') === 'en'){
          document.documentElement.dir = 'ltr';
     }
     else if (localStorage.getItem('lang') === 'ar') {
       document.documentElement.dir = 'rtl';
 
     }
 
 
    }
 
 
    changeLang(lang : string):void {
       if(isPlatformBrowser(this.platId)){
         localStorage.setItem('lang'  , lang);
       }
 
       this.translateService.use(lang);
       this.changeDirection();
    }
 
 
 
 }
 

