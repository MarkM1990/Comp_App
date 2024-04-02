import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiURL = 'URL';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, { username, password });
  }

  kundenbeanstandungErf(data: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    return this.http.post<any>(`${this.apiURL}/Kundenbeanstandung-erf`, data, { headers: headers });
  }

  lieferantenbeanstandungErf(data: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    return this.http.post<any>(`${this.apiURL}/Lieferantenbeanstandung-erf`, data, { headers: headers });
  }

  Kundenbeanstandungabf(data?: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    return this.http.get<any>(`${this.apiURL}/KBeanstandunge-abf`, { headers: headers });
  }

  Lieferantenbeanstandungabf(data?: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    return this.http.get<any>(`${this.apiURL}/LBeanstandunge-abf`, { headers: headers });
  }

  KundenbeanstandungBearb(selectedID: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    const payload = { selectedID: selectedID };
    return this.http.post<any>(`${this.apiURL}/KBeanstandunge-abf/anp`, payload, { headers: headers });
  }

  LieferantenbeanstandungBearb(selectedID: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    const payload = { selectedID: selectedID };
    return this.http.post<any>(`${this.apiURL}/LBeanstandunge-abf/anp`, payload, { headers: headers });
  }

  kundenbeanstandungBearb(data: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    return this.http.post<any>(`${this.apiURL}/Kundenbeanstandung-anp`, data, { headers: headers });
  }

  lieferantenbeanstandungBearb(data: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    return this.http.post<any>(`${this.apiURL}/Lieferantenbeanstandung-anp`, data, { headers: headers });
  }
}  

