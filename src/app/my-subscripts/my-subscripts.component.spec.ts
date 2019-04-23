import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscriptsComponent } from './my-subscripts.component';

describe('MySubscriptsComponent', () => {
  let component: MySubscriptsComponent;
  let fixture: ComponentFixture<MySubscriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubscriptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
