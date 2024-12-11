import { Component, Input } from '@angular/core';
import { Pot } from '../../../interfaces/pot.interface';
import { PotService } from '../../services/pot.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-pot',
  standalone: true,
  imports: [],
  templateUrl: './delete-pot.component.html',
  styleUrl: './delete-pot.component.css'
})
export class DeletePotComponent {
  @Input() pot!: Pot;

  constructor(private potService: PotService,
    private bsModalService: BsModalService) { }
  
  deletePot() {
    this.potService.delete(this.pot.id!).subscribe(() => {
      this.bsModalService.hide();
    });
  }

  close() {
    this.bsModalService.hide();
  }
}
