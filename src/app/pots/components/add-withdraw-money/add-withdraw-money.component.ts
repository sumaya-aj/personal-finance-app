import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Pot } from '../../../interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isNumberAndGreaterThanZeroValidator } from '../../../shared/formCustomValidators/is-number-and-greater-than-zero';
import { PotService } from '../../services/pot.service';

@Component({
  selector: 'app-add-withdraw-money',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-withdraw-money.component.html',
  styleUrl: './add-withdraw-money.component.css'
})
export class AddWithdrawMoneyComponent {
  @Input() pot!: Pot;
  @Input() isAddMoneyMode: boolean = false;
  potForm: FormGroup;
  
  constructor(private bsModalService: BsModalService,
    private fb: FormBuilder,
    private potService: PotService) {
      this.potForm = this.fb.group({
        amountToAddOrWithdraw: [null, [Validators.required, Validators.min(1), isNumberAndGreaterThanZeroValidator]],
      });
  }

  onSubmit(): void {
    if (this.potForm.valid) {
      const pot: Pot = {
          ...this.pot,
          total: this.isAddMoneyMode ? 
            (this.pot.total + this.addedOrWithdrawnAmount) : 
            (this.pot.total - this.addedOrWithdrawnAmount)
      };

      this.potService.update(pot).subscribe(() => {
          this.bsModalService.hide();
      });
    }
  }

  close() {
    this.bsModalService.hide();
  }

  get addedOrWithdrawnAmount(): number {
    const value = this.potForm.get('amountToAddOrWithdraw')?.value;
    return value ? +value : 0;
  }
}
