import { Component, Input } from '@angular/core';
import { Pot } from '../../../interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-pot-item',
  standalone: true,
  imports: [CommonModule, BsDropdownModule],
  templateUrl: './pot-item.component.html',
  styleUrl: './pot-item.component.css'
})
export class PotItemComponent {
  @Input() pot!: Pot;
}
