import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TodosService } from '../../services/todos.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from '@angular/platform-browser';
import { first } from 'rxjs';
import { TodoComponent } from './todo.component';
import { SimpleChange } from '@angular/core';

describe('Header component', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    todosService = TestBed.inject(TodosService);

    component.todo = {
      id: '1',
      text: 'foo',
      isCompleted: false,
    };

    component.isEditing = false;
    fixture.detectChanges();
  });

  it('created', () => {
    expect(component).toBeTruthy();
  });

  it('has correct initial state', () => {
    const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const edit = fixture.debugElement.query(By.css('[data-testid="edit"]'));
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));

    expect(todo.classes['completed']).not.toBeDefined();
    expect(todo.classes['editing']).not.toBeDefined();

    expect(edit).toBeFalsy();

    expect(label.nativeElement.textContent).toEqual('foo');
  });

  it('should toggle todo', () => {
    jest.spyOn(todosService, 'toggleTodo').mockImplementation(() => {});

    const toggle = fixture.debugElement.query(By.css('[data-testid="toggle"]'));
    toggle.nativeElement.click();

    expect(todosService.toggleTodo).toHaveBeenCalledWith('1');
  });

  it('remove todo', () => {
    jest.spyOn(todosService, 'removeTodo').mockImplementation(() => {});

    const toggle = fixture.debugElement.query(
      By.css('[data-testid="destroy"]')
    );
    toggle.nativeElement.click();

    expect(todosService.removeTodo).toHaveBeenCalledWith('1');
  });

  it('should activate editiing', () => {
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));

    let clickedTodoId: string | null | undefined;

    component.setEditingId.pipe(first()).subscribe((id) => {
      clickedTodoId = id;
    });

    label.triggerEventHandler('dblclick', null);

    expect(clickedTodoId).toEqual('1');
  });

  it('should change todo', () => {
    jest.spyOn(todosService, 'changeTodo').mockImplementation(() => {});

    component.isEditing = true;

    fixture.detectChanges();

    const edit = fixture.debugElement.query(By.css('[data-testid="edit"]'));

    edit.nativeElement.value = 'foo';
    edit.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );

    expect(todosService.changeTodo).toHaveBeenCalledWith('1', 'foo');
  });

  it('should fovis after editing acctivation', fakeAsync(() => {
    component.isEditing = true;

    component.ngOnChanges({ isEditing: new SimpleChange(false, true, false) });

    fixture.detectChanges();

    tick();

    const edit = fixture.debugElement.query(By.css(':focus'));

    expect(edit).toBeTruthy();
  }));
});
