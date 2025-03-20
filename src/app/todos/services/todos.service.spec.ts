import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';
import { inject } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';

describe('TodosService', () => {
  let todosSrv: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });

    todosSrv = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('createsSrv', () => {
    expect(todosSrv).toBeTruthy();
  });

  it('sets initial data', () => {
    expect(todosSrv.apiBaseUrl).toEqual(baseUrl);
    expect(todosSrv.todosSig()).toEqual([]);
    expect(todosSrv.filterSig()).toEqual(FilterEnum.all);
  });

  it('sets filter', () => {
    todosSrv.changeFilter(FilterEnum.active);

    expect(todosSrv.filterSig()).toEqual(FilterEnum.active);
  });

  it('getTodos', () => {
    todosSrv.getTodos();
    const req = httpTestingController.expectOne(baseUrl);
    let todoItem: TodoInterface[] | undefined;

    todoItem = [
      {
        id: '1',
        isCompleted: true,
        text: 'haha',
      },
    ];

    req.flush(todoItem);

    expect(todosSrv.todosSig()).toEqual(todoItem);
  });

  describe('changeTodo', () => {
    it('updates a todo', () => {
      todosSrv.todosSig.set([{ text: 'foo', isCompleted: true, id: '4' }]);

      todosSrv.changeTodo('4', 'bar');

      const req = httpTestingController.expectOne(`${baseUrl}/4`);

      req.flush({ text: 'bar', isCompleted: true, id: '4' });

      expect(todosSrv.todosSig()).toEqual([
        { text: 'bar', isCompleted: true, id: '4' },
      ]);
    });
  });

  describe('removeTodo', () => {
    it('removesTodo', () => {
      todosSrv.todosSig.set([{ text: 'foo', isCompleted: true, id: '4' }]);

      todosSrv.removeTodo('4');

      const req = httpTestingController.expectOne(`${baseUrl}/4`);

      req.flush({});
      expect(req.request.method).toBe('DELETE');

      expect(todosSrv.todosSig()).toEqual([]);
    });
  });

  describe('toogle', () => {
    it('toggle', () => {
      todosSrv.todosSig.set([{ text: 'foo', isCompleted: false, id: '4' }]);

      todosSrv.toggleTodo('4');

      const req = httpTestingController.expectOne(`${baseUrl}/4`);

      req.flush({ text: 'foo', isCompleted: true, id: '4' });

      expect(todosSrv.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '4' },
      ]);
    });
  });

  describe('toogleAll', () => {
    it('toggleAll todos', () => {
      todosSrv.todosSig.set([
        { text: 'foo', isCompleted: false, id: '4' },
        { text: 'bar', isCompleted: false, id: '5' },
      ]);

      todosSrv.toggleAll(true);

      // const req = httpTestingController.expectOne(`${baseUrl}/4`);

      const reqs = httpTestingController.match((requests) =>
        requests.url.includes(baseUrl)
      );

      reqs[0].flush({ text: 'foo', isCompleted: true, id: '4' });

      reqs[1].flush({ text: 'bar', isCompleted: true, id: '5' });
      // req.flush({ text: 'foo', isCompleted: true, id: '4' });

      expect(todosSrv.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '4' },
        { text: 'bar', isCompleted: true, id: '5' },
      ]);
    });
  });
});
