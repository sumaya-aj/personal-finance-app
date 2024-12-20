import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input() placeholder: string = "";
  @Output() search: EventEmitter<string> = new EventEmitter<string>(); // Emits search input

  searchTerm: string = ''; // Bound to the input field

  onSearchChange() {
    this.search.emit(this.searchTerm); // Emit the search term whenever it changes
  }
}
