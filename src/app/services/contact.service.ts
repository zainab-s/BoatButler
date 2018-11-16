import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, } from 'rxjs/operators';

import { Contact, CONTACTS } from '../Data/Contact_data';

import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  contactItem = CONTACTS;
  private  urlHOST: string;

  constructor(private http: HttpClient) {
    this.urlHOST = `${environment.baseUrl}/Contact`;
  }

  getContacts(): Observable<Contact[]> {
    return of(CONTACTS);
  }

  addContact(ContactItem) {
    this.contactItem.push(ContactItem);
  }

  postContact(ContactItem) {
      const url = this.urlHOST;
      const body = JSON.stringify( ContactItem );
      const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }; // these headers almost took my life

     const req = this.http.post<Contact>(url, body, httpOptions).pipe(
     tap(_ => console.log(`updated contact id=${Contact.name}`)),
     catchError(this.handleError<any>('Contact'))
   );
     req.subscribe();
     console.log(req);
  }

  /**Not sure how this handleError works . let's pray they are enough
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
