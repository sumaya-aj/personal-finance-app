import { Component, Input } from '@angular/core';
import { Pot } from '../../../interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddEditPotComponent } from '../add-edit-pot/add-edit-pot.component';

@Component({
  selector: 'app-pot-item',
  standalone: true,
  imports: [CommonModule, BsDropdownModule],
  templateUrl: './pot-item.component.html',
  styleUrl: './pot-item.component.css'
})
export class PotItemComponent {
  @Input() pot!: Pot;
  editPotModal?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openEditPot(userId: number, potId?: number): void {
    this.editPotModal = this.modalService.show(AddEditPotComponent);

  }
}
