import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePotComponent } from './delete-pot.component';

describe('DeletePotComponent', () => {
  let component: DeletePotComponent;
  let fixture: ComponentFixture<DeletePotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
