import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

import { By } from '@angular/platform-browser';
import { first, firstValueFrom } from 'rxjs';
import { UtilsService } from '../../shared/utils/services/utils.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const mockUtilsSrv = {
    range: () => [1, 2, 3, 4, 5],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: UtilsService, useValue: mockUtilsSrv }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 50;
    component.limit = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  describe('selection page', () => {
    it('redners correct pagination', () => {
      const pageContainers = fixture.debugElement.queryAll(
        By.css('[data-testid="page-container"]')
      );

      expect(pageContainers.length).toBe(5);
    });

    it('selects page by output', async () => {
      // component.selectPage(2);

      // fixture.detectChanges();
      // const eventobs = component.pageChangeEvent.asObservable();
      // const event = await firstValueFrom(eventobs);
      // expect(event).toBe(2);

      const pageContainers = fixture.debugElement.queryAll(
        By.css('[data-testid="page-container"]')
      );

      let clickedPage: number | undefined;

      component.pageChangeEvent.subscribe((page) => {
        clickedPage = page;
      });

      pageContainers[0].nativeElement.click();

      expect(clickedPage).toBe(1);
    });
  });
});
