import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../../../shared/interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:3000/transactions';
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  
  constructor(private http: HttpClient) { }

  get(userId: number): Observable<Transaction[]> {
    this.http.get<Transaction[]>(`${this.apiUrl}?userId=${userId}`).subscribe((data) => {
      this.transactionsSubject.next(data);
    });
    return this.transactionsSubject.asObservable();
  }
}
