import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getAuthors(): Observable<any> {
    return this.http.get('/api/authors').map(res => res.json());
  }

  countAuthors(): Observable<any> {
    return this.http.get('/api/authors/count').map(res => res.json());
  }

  addAuthor(author): Observable<any> {
    return this.http.post('/api/author', JSON.stringify(author), this.options);
  }

  getAuthor(author): Observable<any> {
    return this.http.get(`/api/author/${author._id}`).map(res => res.json());
  }

  editAuthor(author): Observable<any> {
    return this.http.put(`/api/author/${author._id}`, JSON.stringify(author), this.options);
  }

  deleteAuthor(author): Observable<any> {
    return this.http.delete(`/api/author/${author._id}`, this.options);
  }

}
