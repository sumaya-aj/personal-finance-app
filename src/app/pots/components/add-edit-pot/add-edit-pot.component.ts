import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../../interfaces/theme.interface';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { PotService } from '../../services/pot.service';
import { Pot } from '../../../interfaces/pot.interface';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-edit-pot',
  standalone: true,
  imports: [CommonModule, BsDropdownModule, FormsModule],
  templateUrl: './add-edit-pot.component.html',
  styleUrl: './add-edit-pot.component.css'
})
export class AddEditPotComponent implements OnInit {
  themes$!: Observable<Theme[]>;
  selectedThemeName: string = 'Select';
  selectedThemeId!: number;
  selectedThemeHexCode!: string;
  potName: string = '';
  target!: number;

  constructor(private commonService: CommonService,
    private potService: PotService,
    private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.themes$ = this.commonService.getThemes();
  }
  
  onThemeSelect(theme: Theme): void {
    this.selectedThemeName = theme.color_name;
    this.selectedThemeId = theme.id;
    this.selectedThemeHexCode = theme.hex_code;
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const newPot: Pot = {
        user_id: 1,
        name: form.value.potName,
        target: form.value.target,
        total: 0,
        theme: {
          id: this.selectedThemeId,
          color_name: this.selectedThemeName,
          hex_code: this.selectedThemeHexCode,
        },
      };

      this.potService.addPot(newPot).subscribe({
        next: () => {
          form.reset();
          this.bsModalService.hide();
        },
        error: (err) => {
          console.error('Error adding pot:', err);
        },
      });
    }
  }
}

