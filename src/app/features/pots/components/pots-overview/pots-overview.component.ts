import { Component, OnInit } from '@angular/core';
import { PotItemComponent } from '../pot-item/pot-item.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddEditPotComponent } from '../add-edit-pot/add-edit-pot.component';
import { PotService } from '../../services/pot.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Pot } from '../../../../shared/interfaces/pot.interface';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [PotItemComponent, CommonModule],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css'
})
export class PotsOverviewComponent implements OnInit {
  pots$!: Observable<Pot[]>;

  constructor(private bsModalService: BsModalService,
    private potService: PotService) { }
  
  ngOnInit(): void {
    this.pots$ = this.potService.get(1);
  }

  openAddPot(): void {
    this.bsModalService.show(AddEditPotComponent);
  }
  
}
