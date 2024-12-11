import { Component, OnInit } from '@angular/core';
import { PotItemComponent } from '../pot-item/pot-item.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddEditPotComponent } from '../add-edit-pot/add-edit-pot.component';
import { PotService } from '../../services/pot.service';
import { Pot } from '../../../interfaces/pot.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [PotItemComponent, CommonModule],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css'
})
export class PotsOverviewComponent implements OnInit {

  addPotModal?: BsModalRef;
  pots$!: Observable<Pot[]>;

  constructor(private bsModalService: BsModalService,
    private potService: PotService) { }
  
  ngOnInit(): void {
    this.pots$ = this.potService.getAll(1);
  }

  openAddPot(): void {
    this.addPotModal = this.bsModalService.show(AddEditPotComponent);
  }
  
}
