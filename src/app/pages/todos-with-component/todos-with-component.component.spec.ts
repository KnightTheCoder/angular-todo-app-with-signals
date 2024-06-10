import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosWithComponentComponent } from './todos-with-component.component';

describe('TodosWithComponentComponent', () => {
  let component: TodosWithComponentComponent;
  let fixture: ComponentFixture<TodosWithComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosWithComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosWithComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
