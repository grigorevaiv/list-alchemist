import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListingService, ListingSuggestion } from '@core/listing-service/listing-service';
import { environment } from '../../../environments/environment';


describe('ListingService', () => {
  let service: ListingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ListingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('sends a POST request with the description in the body', () => {
    const mockResponse: ListingSuggestion = {
      title: 'Vintage Jacket',
      tags: ['jacket'],
      priceRange: '€40 - €60',
    };

    service.getSuggestion('vintage leather jacket').subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    // built from environment rather than hardcoded, so switching the API URL
    // can't quietly break this test
    const req = httpMock.expectOne(`${environment.apiUrl}/listing/suggest`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      description: 'vintage leather jacket',
    });

    req.flush(mockResponse);
  });
});