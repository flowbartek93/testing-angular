import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosService } from '../../services/todos.service';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('Header component', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('created', () => {
    expect(component).toBeTruthy();
  });

  it('shoudl add ad todo', () => {
    jest.spyOn(todosService, 'addTodo').mockImplementation(() => {});

    const input = fixture.debugElement.query(
      By.css('[data-testid="newTodoInput"]')
    );

    input.nativeElement.value = 'foo';

    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );

    expect(todosService.addTodo).toHaveBeenCalledWith('foo');
  });
});
