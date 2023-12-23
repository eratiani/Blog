import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogFormViewComponent } from './new-blog-form-view.component';

describe('NewBlogFormViewComponent', () => {
  let component: NewBlogFormViewComponent;
  let fixture: ComponentFixture<NewBlogFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBlogFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBlogFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
