import { environment } from './../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPercentage() {
    return this.http.get<number>(`${this.baseUrl}/flags`);
  }

  setPercentage(value: number) {
    return this.http.post(`${this.baseUrl}/flags/admin`, value);
  }

}