import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../../interfaces/theme.interface';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
8

@Component({
  selector: 'app-add-edit-pot',
  standalone: true,
  imports: [CommonModule, BsDropdownModule],
  templateUrl: './add-edit-pot.component.html',
  styleUrl: './add-edit-pot.component.css'
})
export class AddEditPotComponent implements OnInit {
  themes$!: Observable<Theme[]>;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.themes$ = this.commonService.getThemes();
  }
}
