import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddEditPotComponent } from '../add-edit-pot/add-edit-pot.component';
import { AddWithdrawMoneyComponent } from '../add-withdraw-money/add-withdraw-money.component';
import { DeletePotComponent } from '../delete-pot/delete-pot.component';
import { Pot } from '../../../../shared/interfaces/pot.interface';

@Component({
  selector: 'app-pot-item',
  standalone: true,
  imports: [CommonModule, BsDropdownModule],
  templateUrl: './pot-item.component.html',
  styleUrl: './pot-item.component.css'
})
export class PotItemComponent {
  @Input() pot!: Pot;
 
  constructor(private modalService: BsModalService) { }

  openEditPot(): void {
    this.modalService.show(AddEditPotComponent, {
      initialState: {
        isEditMode: true,
        editedPot: this.pot
      },
    });
  }

  openAddMoneyModal() {
    this.modalService.show(AddWithdrawMoneyComponent, {
      initialState: {
        pot: this.pot,
        isAddMoneyMode: true
      }
    });
  }

  openWithdrawMoneyModal() {
    this.modalService.show(AddWithdrawMoneyComponent, {
      initialState: {
        pot: this.pot
      }
    });
  }

  openConfirmDeletePot(){
    this.modalService.show(DeletePotComponent, {
      initialState: {
        pot: this.pot
      }
    });
  }
}
