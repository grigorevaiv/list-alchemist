import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListingFormComponent } from './listing-form';
import { ListingService, ListingSuggestion } from '../listing-service';

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
    it('does not call the service when description is empty or whitespace-only', () => {
      component.description.set('   ');

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
      component.description.set('vintage leather jacket');

      component.onSubmit();

      expect(component.suggestion()).toEqual(mockResponse);
      expect(component.isLoading()).toBe(false);
      expect(component.hasSubmitted()).toBe(true);
    });

    it('populates suggestion with a parsed error message when the request fails', () => {
      mockListingService.getSuggestion.mockReturnValue(
        throwError(() => ({
          error: { message: ['Description is too short to generate an answer'] },
        })),
      );
      component.description.set('short');

      component.onSubmit();

      expect(component.suggestion()?.error).toBe(
        'Description is too short to generate an answer',
      );
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('onClear', () => {
    it('resets description, suggestion, and hasSubmitted', () => {
      component.description.set('something');
      component.suggestion.set({ title: 'x', tags: [], priceRange: '€10' });
      component.hasSubmitted.set(true);

      component.onClear();

      expect(component.description()).toBe('');
      expect(component.suggestion()).toBeNull();
      expect(component.hasSubmitted()).toBe(false);
    });
  });
});