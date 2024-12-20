import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Transaction } from '../../../../shared/interfaces/transaction.interface';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { SortingDropdownComponent } from '../../../../shared/components/sorting-dropdown/sorting-dropdown.component';
import { CommonService } from '../../../../shared/services/common.service';
import { Category } from '../../../../shared/interfaces/category.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, SortingDropdownComponent, PaginationComponent],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent implements OnInit {

  transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  allTransactions!: Transaction[];
  filteredTransactions!: Transaction[];

  categories$!: Observable<Category[]>;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private transactionsService: TransactionService,
    private commonService: CommonService) { }
  
  // ngOnInit(): void {
  //   this.transactionsSubject.subscribe(data => {
  //     this.filteredTransactions = data;
  //   });
    
  //   this.transactionsService.get(1).subscribe(data => {
  //     console.log(data)
  //     this.allTransactions = data;
  //     this.transactionsSubject.next(data);
  //   });

  //   this.categories$ = this.commonService.getCategories();
  //   this.updatePaginatedData();
  // }

  ngOnInit(): void {
    this.transactionsSubject.subscribe(data => {
      this.filteredTransactions = data;
    });
  
    this.transactionsService.get(1).subscribe(data => {
      console.log(data);
      this.allTransactions = data;
      this.transactionsSubject.next(data); // Emit the fetched data.
      this.updatePaginatedData(); // Update pagination after data is available.
    });
  
    this.categories$ = this.commonService.getCategories();
  }

  onSearch(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.transactionsSubject.next(this.allTransactions);
    } else {
      const filteredTransactions = this.filteredTransactions.filter(transaction =>
        transaction.recipient_sender_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      this.transactionsSubject.next(filteredTransactions);
    }
  }

  onSortedTransactions(sortedTransactions: Transaction[]) {
    this.transactionsSubject.next(sortedTransactions);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    if (selectedValue == "0") {
      this.transactionsSubject.next(this.allTransactions);
    } else {
      const filteredTransactions = this.allTransactions.filter(transaction =>
        transaction.category.id === selectedValue
      );
      this.transactionsSubject.next(filteredTransactions);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    const paginatedData = this.allTransactions.slice(start, end);
    this.transactionsSubject.next(paginatedData);
  }
}
