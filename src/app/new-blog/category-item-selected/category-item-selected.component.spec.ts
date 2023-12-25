import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemSelectedComponent } from './category-item-selected.component';

describe('CategoryItemSelectedComponent', () => {
  let component: CategoryItemSelectedComponent;
  let fixture: ComponentFixture<CategoryItemSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryItemSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryItemSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
