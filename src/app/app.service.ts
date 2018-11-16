import {Inject, Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
import {Observable} from "rxjs/observable";
import 'rxjs/add/operator/map';


declare var require: any  

@Injectable()
export class EgnTranslateService {
    constructor(private http:Http) {

    }

	
	public getEnglishJsonObj(url) :Observable<any> {
	//	console.log('In service')
		return this.http.get(url)
		//.map(res => {
		//	res.json() 
		// 	console.log(res.json());
        //});
		//.catch(this.handleError)
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
