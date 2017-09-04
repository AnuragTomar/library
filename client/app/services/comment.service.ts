import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getComments(): Observable<any> {
    return this.http.get('/api/comments').map(res => res.json());
  }

  countComments(): Observable<any> {
    return this.http.get('/api/comments/count').map(res => res.json());
  }

  addComment(comment): Observable<any> {
    return this.http.post('/api/comment', JSON.stringify(comment), this.options);
  }

  getComment(comment): Observable<any> {
    return this.http.get(`/api/comment/${comment._id}`).map(res => res.json());
  }

  editComment(comment): Observable<any> {
    return this.http.put(`/api/comment/${comment._id}`, JSON.stringify(comment), this.options);
  }

  deleteComment(comment): Observable<any> {
    return this.http.delete(`/api/comment/${comment._id}`, this.options);
  }

}
