import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoFechaComponent } from './curso-fecha.component';

describe('CursoFechaComponent', () => {
  let component: CursoFechaComponent;
  let fixture: ComponentFixture<CursoFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoFechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
