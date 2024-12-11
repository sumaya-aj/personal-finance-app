import { Component, Input } from '@angular/core';
import { Pot } from '../../../interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddEditPotComponent } from '../add-edit-pot/add-edit-pot.component';
import { AddWithdrawMoneyComponent } from '../add-withdraw-money/add-withdraw-money.component';
import { DeletePotComponent } from '../delete-pot/delete-pot.component';

@Component({
  selector: 'app-pot-item',
  standalone: true,
  imports: [CommonModule, BsDropdownModule],
  templateUrl: './pot-item.component.html',
  styleUrl: './pot-item.component.css'
})
export class PotItemComponent {
  @Input() pot!: Pot;
  editPotModal!: BsModalRef;
  addMoneyModal!: BsModalRef;
  deletePotModal!: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openEditPot(): void {
    this.editPotModal = this.modalService.show(AddEditPotComponent, {
      initialState: {
        isEditMode: true,
        editedPot: this.pot
      },
    });
  }

  openAddMoney(){
    this.addMoneyModal = this.modalService.show(AddWithdrawMoneyComponent);
  }

  openConfirmDeletePot(){
    this.deletePotModal = this.modalService.show(DeletePotComponent, {
      initialState: {
        pot: this.pot
      }
    });
  }
}
