import { Component } from '@angular/core';
import { PotItemComponent } from '../pot-item/pot-item.component';
import { AddPotComponent } from '../add-pot/add-pot.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [PotItemComponent, AddPotComponent],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css'
})
export class PotsOverviewComponent {

  addPotModal?: BsModalRef;
  
  constructor(private bsModalService: BsModalService) { }

  openAddPot(): void {
    this.addPotModal = this.bsModalService.show(AddPotComponent);
  }

  closeAddPotModal(): void {
    if (this.addPotModal) 
      this.bsModalService.hide();
  }


}
