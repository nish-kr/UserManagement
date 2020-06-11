import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BACKEND_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  public get(purpose: string) {
    return this.http.get(this.BACKEND_URL + '/' + purpose);
  }

  public post(data: any, purpose: string) {
    return this.http.post(this.BACKEND_URL + '/' + purpose, data);
  }
}
