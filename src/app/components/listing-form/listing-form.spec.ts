import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { of, throwError, Subject } from 'rxjs';
import { ListingFormComponent } from './listing-form';
import { ListingService, ListingSuggestion } from '@core/listing-service/listing-service';


describe('ListingFormComponent', () => {
  let component: ListingFormComponent;
  let mockListingService: { getSuggestion: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockListingService = {
      getSuggestion: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ListingFormComponent],
      providers: [{ provide: ListingService, useValue: mockListingService }],
    });

    component = TestBed.createComponent(ListingFormComponent).componentInstance;
  });

  describe('onSubmit', () => {
    it('does not call the service when the form is invalid', () => {
      component.form.controls.description.setValue('');

      component.onSubmit();

      expect(mockListingService.getSuggestion).not.toHaveBeenCalled();
    });

    it('populates suggestion with the successful response', () => {
      const mockResponse: ListingSuggestion = {
        title: 'Vintage Jacket',
        tags: ['jacket', 'vintage'],
        priceRange: '€40 - €60',
      };
      mockListingService.getSuggestion.mockReturnValue(of(mockResponse));
      component.form.controls.description.setValue(
        '   vintage leather jacket, worn once, size M   ',
      );

      component.onSubmit();

      expect(mockListingService.getSuggestion).toHaveBeenCalledWith(
        'vintage leather jacket, worn once, size M',
      );
      expect(component.suggestion()).toEqual(mockResponse);
      expect(component.isLoading()).toBe(false);
      expect(component.hasSubmitted()).toBe(true);
    });

    it('ignores a second submit while a request is still in flight', () => {
      mockListingService.getSuggestion.mockReturnValue(new Subject<ListingSuggestion>());
      component.form.controls.description.setValue(
        'vintage leather jacket, worn once, size M',
      );

      component.onSubmit();
      component.onSubmit();

      expect(mockListingService.getSuggestion).toHaveBeenCalledTimes(1);
    });

    it('populates suggestion with a generic error message when the request fails', () => {
      mockListingService.getSuggestion.mockReturnValue(
        throwError(() => ({ status: 502 })),
      );
      component.form.controls.description.setValue(
        'vintage leather jacket, worn once, size M',
      );

      component.onSubmit();

      expect(component.suggestion()?.error).toBe(
        'Something went wrong — please try again',
      );
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('onClear', () => {
    it('resets the form, suggestion, and hasSubmitted', () => {
      component.form.controls.description.setValue('something');
      component.suggestion.set({ title: 'x', tags: [], priceRange: '€10' });
      component.hasSubmitted.set(true);

      component.onClear();

      expect(component.form.controls.description.value).toBe('');
      expect(component.suggestion()).toBeNull();
      expect(component.hasSubmitted()).toBe(false);
    });
  });
});