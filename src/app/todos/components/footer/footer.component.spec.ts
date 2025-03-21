import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  describe('component visiblity', () => {
    todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);

    it('should be hidden when no todos', () => {
      const footer = fixture.debugElement.query(By.css('data-testid="footer"'));

      expect(footer.classes['hidden']).not.toBeDefined();
    });
  });

  describe('conters', () => {
    it('renders', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);

      fixture.detectChanges();

      const todoCount = fixture.debugElement.query(
        By.css('data-testid="todoCount"')
      );

      expect(todoCount);
    });
  });
});
