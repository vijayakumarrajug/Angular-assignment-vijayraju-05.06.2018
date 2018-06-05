import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';


@Injectable()
export class ApiUrlsService {

  constructor (
    private apiService: ApiService,
    private http: HttpClient

  ) {}

  findAll(data) {
    return this.apiService.get('/findall', data)
    .pipe(map(
      data => {
        return data;
      },
      err => {
      }
    ));
  }

  delete(data) {
        return this.apiService.post('/remove', data)
        .pipe(map(
        data => {
          return data;
        },
        err => {
        }
      ));
  }  

  edit(data) {
    return this.apiService.post('/edit', data)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  find(data) {
    return this.apiService.post('/find', data)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  
  
}
