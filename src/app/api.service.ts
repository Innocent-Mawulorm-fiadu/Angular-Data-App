import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{IRawData} from './rawdata';
import { Observable } from 'rxjs/Observable';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

 private SERVER_URL= "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }

  public getData():Observable<IRawData[]>{
    return this.httpClient.get<IRawData[]>(this.SERVER_URL);
  }
}
