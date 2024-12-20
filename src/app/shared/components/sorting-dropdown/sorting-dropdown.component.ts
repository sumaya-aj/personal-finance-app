import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../interfaces/transaction.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sorting-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sorting-dropdown.component.html',
  styleUrl: './sorting-dropdown.component.css'
})
export class SortingDropdownComponent {
  
  readonly sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Highest', value: 'highest' },
    { label: 'Lowest', value: 'lowest' },
    { label: 'A to Z', value: 'a-to-z' },
    { label: 'Z to A', value: 'z-to-a' },
  ];
  
  @Input() data!: Transaction[];

  @Output() sortedData = new EventEmitter<Transaction[]>();

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    const sorted = this.sortData(this.data, selectedValue);
    this.sortedData.emit(sorted);
  }

  private sortData(data: Transaction[], sortValue: string): Transaction[] {
    switch (sortValue) {
      case 'latest':
        return [...data].sort((a: Transaction, b: Transaction) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
      
      case 'oldest':
        return [...data].sort((a: Transaction, b: Transaction) => new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime());
      
      case 'highest':
        return [...data].sort((a: Transaction, b: Transaction) => b.amount - a.amount);
      
      case 'lowest':
        return [...data].sort((a: Transaction, b: Transaction) => a.amount - b.amount);
      
      case 'a-to-z':
        return [...data].sort((a: Transaction, b: Transaction) => a.recipient_sender_name.localeCompare(b.recipient_sender_name));
      
      case 'z-to-a':
        return [...data].sort((a: Transaction, b: Transaction) => b.recipient_sender_name.localeCompare(a.recipient_sender_name));
      
      default:
        return data;
    }
  }
}
