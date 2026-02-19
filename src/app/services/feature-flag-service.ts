import { environment } from './../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {

  private percentageSubject = new BehaviorSubject<number | null>(null);
  percentage$ = this.percentageSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPercentage();
  }

  loadPercentage() {
    this.http.get<number>(`${environment.apiUrl}/flags`).subscribe(v => this.percentageSubject.next(v));
  }

  setPercentage(value: number) {
    return this.http.post(`${environment.apiUrl}/flags/admin`, value).pipe(tap(() => {
      this.percentageSubject.next(value);
      this.loadPercentage();
    })
    );
  }
}