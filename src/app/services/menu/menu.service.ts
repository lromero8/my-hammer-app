import { Injectable } from '@angular/core';
import { Item } from './item';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  endpoint: string = 'http://localhost:5000/api';
  // endpoint: string = '/api';

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }


  // Create Item
  createItem(item: typeof Item) {
    return this.http.post<any>(`${this.endpoint}/item`, item)
      .pipe(map(data => {
        // console.log(data)
        return data
      }));
  }

  // Get Items
  getItems() {
    return this.http.get<any>(`${this.endpoint}/item`)
      .pipe(map(data => {
        // console.log(data)
        return data;
      }));
  }

}
