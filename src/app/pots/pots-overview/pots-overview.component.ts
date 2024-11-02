import { Component } from '@angular/core';
import { PotItemComponent } from '../pot-item/pot-item.component';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [PotItemComponent],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css'
})
export class PotsOverviewComponent {

}
