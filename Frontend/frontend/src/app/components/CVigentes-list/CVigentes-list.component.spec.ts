import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDocentesComponent } from './CVigentes-list.component';

describe('CursosDocentesComponent', () => {
  let component: CursosDocentesComponent;
  let fixture: ComponentFixture<CursosDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosDocentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
