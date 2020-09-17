import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CommonService {

  projectPath = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  postData(url: string) {
    var headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(this.projectPath + "/" + url, { headers: headers });
  }
}