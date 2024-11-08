import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pot } from '../../interfaces/pot.interface';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  private apiUrl = 'http://localhost:3000/pots';

  constructor(private http: HttpClient) {}

  getPots(userId: number): Observable<Pot[]> {
    return this.http.get<Pot[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  addPot(pot: Pot): Observable<Pot> {
    return this.http.post<Pot>(this.apiUrl, pot);
  }
}
