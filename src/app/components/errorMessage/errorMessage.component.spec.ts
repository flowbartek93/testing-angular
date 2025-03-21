import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './errorMessage.component';
import { By } from '@angular/platform-browser';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('creates error comp', () => {
    expect(component).toBeTruthy;
  });

  it('renders default error state', () => {
    const msgContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );

    expect(msgContainer.nativeElement.textContent).toEqual(
      'Something went wrong'
    );
  });

  it('redners custom error message', () => {
    component.message = 'Emial is taken';
    fixture.detectChanges();

    const msgContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );

    expect(msgContainer.nativeElement.textContent).toEqual('Emial is taken');
  });
});
