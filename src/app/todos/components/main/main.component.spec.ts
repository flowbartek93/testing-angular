import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosService } from '../../services/todos.service';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodoComponent } from '../todo/todo.component';

//Shallow tesing

@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: '',
})
class TodoComponentMock {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('Header component', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MainComponent],
    })
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [TodoComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('created', () => {
    expect(component).toBeTruthy();
  });

  describe('component visiblity', () => {
    it('should be hidden without todos', () => {
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).toEqual(true);
    });

    it('should be visible with todos', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);

      fixture.detectChanges();
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).not.toBeDefined();
    });

    it('checked if all todos selected', () => {
      todosService.todosSig.set([
        { id: '1', text: 'foo', isCompleted: true },
        { id: '2', text: 'bart', isCompleted: true },
        { id: '3', text: 'fooeee', isCompleted: true },
      ]);

      fixture.detectChanges();
      const toggleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );

      expect(toggleAll.properties['checked']).toBe(true);
    });

    it('should toggle all todos', () => {
      //!! mockowanie serwisu zeby nie wolac realnego
      jest.spyOn(todosService, 'toggleAll').mockImplementation(() => {});

      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);

      fixture.detectChanges();

      const toggleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );

      toggleAll.nativeElement.click();
      expect(todosService.toggleAll).toHaveBeenCalledWith(false);
    });

    it('should render a list of todos', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);

      fixture.detectChanges();

      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );

      expect(todos.length).toEqual(1);

      expect(todos[0].componentInstance.todo).toEqual({
        id: '1',
        text: 'foo',
        isCompleted: false,
      });

      expect(todos[0].componentInstance.isEditing).toEqual(false);
    });
  });
});
