import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TagInterface } from '../types/tag.interface';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

describe('api service', () => {
  let apiSrv: ApiService;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiSrv = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('created srv', () => {
    expect(apiSrv).toBeTruthy();
  });

  describe('getTags', () => {
    it('should return list of tags', () => {
      let tags: TagInterface[] | undefined;
      apiSrv.getTags().subscribe((res) => {
        tags = res;
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush([{ id: '1', name: 'foo' }]);

      expect(tags).toEqual([{ id: '1', name: 'foo' }]);
    });
  });

  it('should create a tag', () => {
    const mockTag: TagInterface = { id: '1', name: 'foo' };

    apiSrv.createTag('foo').subscribe((response) => {
      expect(response).toEqual(mockTag);
    });

    const req = httpTestingController.expectOne('http://localhost:3004/tags');

    expect(req.request.method).toBe('POST');

    req.flush(mockTag);
  });

  it('should throw err', () => {
    let error: HttpErrorResponse | undefined;

    apiSrv.createTag('foo').subscribe({
      next: () => {
        fail('Success not called');
      },

      error: (err) => {
        error = err;
      },
    });

    const req = httpTestingController.expectOne('http://localhost:3004/tags');

    req.flush('ser err', {
      status: 422,
      statusText: 'unpocessable',
    });

    if (!error) {
      throw new Error('error to defined');
    }

    expect(error.status).toEqual(422);
    expect(error.statusText).toEqual('unpocessable');
  });
});
