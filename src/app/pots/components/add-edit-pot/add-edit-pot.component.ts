import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../../interfaces/theme.interface';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PotService } from '../../services/pot.service';
import { Pot } from '../../../interfaces/pot.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumberAndGreaterThanZeroValidator } from '../../../shared/formCustomValidators/is-number-and-greater-than-zero';

@Component({
  selector: 'app-add-edit-pot',
  standalone: true,
  imports: [CommonModule, BsDropdownModule, ReactiveFormsModule],
  templateUrl: './add-edit-pot.component.html',
  styleUrl: './add-edit-pot.component.css'
})
export class AddEditPotComponent implements OnInit {

    potForm!: FormGroup;
    themes$!: Observable<Theme[]>;
    selectedThemeName: string = 'Select';
    selectedThemeId!: number;
    selectedThemeHexCode!: string;

    @Input() isEditMode: boolean = false;
    @Input() editedPot!: Pot;

    constructor(
        private fb: FormBuilder,
        private commonService: CommonService,
        private potService: PotService,
        private bsModalService: BsModalService
    ) {}

    ngOnInit(): void {
        this.themes$ = this.commonService.getThemes();

        this.potForm = this.fb.group({
            potName: ['', Validators.required],
            target: [null, [Validators.required, Validators.min(1), isNumberAndGreaterThanZeroValidator]],
            theme: [null, Validators.required],
        });

        if (this.isEditMode && this.editedPot) {
            this.potForm.patchValue({
                potName: this.editedPot.name,
                target: this.editedPot.target,
                theme: this.editedPot.theme.id
            });
            this.selectedThemeName = this.editedPot.theme.color_name;
            this.selectedThemeHexCode = this.editedPot.theme.hex_code;
        }

        console.log('Form Status:', this.potForm.status);
        console.log('Form Values:', this.potForm.value);
        console.log('Form Errors:', this.potForm.errors);
        console.log('Target Control Errors:', this.potForm.get('target')?.errors);
    }

    onThemeSelect(theme: Theme): void {
        this.selectedThemeName = theme.color_name;
        this.selectedThemeId = theme.id;
        this.selectedThemeHexCode = theme.hex_code;
        this.potForm.patchValue({ theme: theme.id });
    }

    onSubmit(): void {
        if (this.potForm.valid) {
            const pot: Pot = {
                user_id: 1,
                name: this.potForm.value.potName,
                target: this.potForm.value.target,
                total: this.isEditMode ? this.editedPot.total : 0,
                theme: {
                    id: this.isEditMode ? this.editedPot.theme.id : this.selectedThemeId,
                    color_name: this.selectedThemeName,
                    hex_code: this.selectedThemeHexCode,
                },
            };

            if (this.isEditMode) {
                pot.id = this.editedPot.id;
                this.potService.updatePot(pot).subscribe(() => {
                    this.bsModalService.hide();
                });
            } else {
                this.potService.addPot(pot).subscribe(() => {
                    this.potForm.reset();
                    this.bsModalService.hide();
                });
            }
        }
    }
}
