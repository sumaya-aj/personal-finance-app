import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Pot } from '../../interfaces/pot.interface';

@Injectable({
  providedIn: 'root'
})
export class PotService {

  private apiUrl = 'http://localhost:3000/pots';

  private potsSubject = new BehaviorSubject<Pot[]>([]);
  pots$: Observable<Pot[]> = this.potsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadPots(userId: number): Observable<Pot[]> {
    this.http.get<Pot[]>(`${this.apiUrl}?userId=${userId}`).subscribe((data) => {
      this.potsSubject.next(data);
    });
    return this.potsSubject.asObservable();
  }

  addPot(pot: Pot): Observable<Pot> {
    return this.http.post<Pot>(this.apiUrl, pot).pipe(
      tap((newPot) => {
        const currentPots = this.potsSubject.value;
        this.potsSubject.next([...currentPots, newPot]);
      })
    );
  }

}