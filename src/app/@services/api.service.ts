import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  $event: any;

  url: string = 'https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json' ;
;
  constructor(
    private http: HttpClient,
  ) { }

  getData():any {
   return this.http.get( this.url )
    
  }

}
