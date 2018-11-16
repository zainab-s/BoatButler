import { Injectable } from '@angular/core';
import {Http,Response,Headers, RequestOptions} from "@angular/http";
import { HttpInterceptor, HttpHandler, HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/observable";
//import {LocalStorageService} from "ngx-webstorage";
import 'rxjs/add/operator/map';

let headers = new Headers({
	'Content': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': 'POST',
});

let options = new RequestOptions({ headers: headers},);

@Injectable()
export class poeditor {
   constructor(private http:Http ) {}
       // PoEditor integration
	
	public getPoEditorEnTranslation(language:string){
console.log('InPoEditor');

		const url = 'https://api.poeditor.com/v2/projects/export'
		var body = `api_token=3e642a7b384f87baef9bf7dc972d8763&action=export&id=220305&language=${language}&type=key_value_json`
        
        return this.http.post(url,body,options)
            .map(this.extractData)
           //console.log(url);
			// //.catch(this.handleError)
	}

	public getEnglishJsonObj(url){
        console.log(url);
		return this.http.get(url)
		.map(this.extractData)
		//.catch(this.handleError)
	}

	private extractData(res: Response) {
		let body = res.json();
		return body || { };
	  }
	  
	  private handleError (error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
		  const body = error.json() || '';
		  const err = body.message || JSON.stringify(body);
		  errMsg = `${err}`;
		} else {
		  errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	  }



  
}