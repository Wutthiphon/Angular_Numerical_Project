import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.apiURL + '/system/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  checkServerStatus(): Observable<any> {
    return this.http.get(API + 'status');
  }

  findFormula(
    formula: string,
    input_array: any,
    mode: String
  ): Observable<any> {
    return this.http.post(
      API + 'find/formula',
      {
        formula: formula,
        input_array: input_array,
        mode: mode,
      },
      httpOptions
    );
  }

  randMatrix(mode: String): Observable<any> {
    return this.http.post(
      API + 'random/matrix',
      {
        mode: mode,
      },
      httpOptions
    );
  }

  findMatrix(input_array: any, mode: String): Observable<any> {
    return this.http.post(
      API + 'find/matrix',
      {
        input_array: input_array,
        mode: mode,
      },
      httpOptions
    );
  }

  saveFormula(
    formula: string,
    input_array: any,
    mode: String,
    result: any
  ): Observable<any> {
    return this.http.put(
      API + 'save/formula',
      {
        formula: formula,
        input_array: input_array,
        mode: mode,
        result: result,
      },
      httpOptions
    );
  }

  saveMatrix(input_array: any, mode: String, result: any): Observable<any> {
    return this.http.put(
      API + 'save/matrix',
      {
        input_array: input_array,
        mode: mode,
        result: result,
      },
      httpOptions
    );
  }
}
