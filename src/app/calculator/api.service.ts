import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // *** zOS Connect API call to connect CICS directly ***
  baseUrl = 'http://192.86.32.87:19080/cicsmortsampleapi/request';
  // *** zOS Connect API call to connect CICS through aws lambda gateway ***
  //baseUrl = 'https://sw7gahz62txf4kvq5lfjvroksu0naoha.lambda-url.us-east-1.on.aws';
  constructor(private httpClient: HttpClient) { }

   loanCalculate(body:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpClient.post(this.baseUrl, body, { headers }
    ).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return error;
      })
    );
  }
}
