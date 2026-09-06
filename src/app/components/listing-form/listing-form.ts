import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListingService, ListingSuggestion } from '@core/listing-service';

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listing-form.html',
  styleUrl: './listing-form.css',
})
export class ListingFormComponent {
  private listingService = inject(ListingService);

  description = signal('');
  suggestion = signal<ListingSuggestion | null>(null);
  isLoading = signal(false);
  hasSubmitted = signal(false);

  onSubmit(): void {
    if (!this.description().trim()) return;

    this.isLoading.set(true);
    this.hasSubmitted.set(true);
    this.suggestion.set(null);

    this.listingService.getSuggestion(this.description()).subscribe({
      next: (result) => {
        this.suggestion.set(result);
        this.isLoading.set(false);
      },
      error: (err) => {
        const backendMessage = Array.isArray(err?.error?.message)
          ? err.error.message[0]
          : err?.error?.message;

        this.suggestion.set({
          title: '',
          tags: [],
          priceRange: '',
          error: backendMessage ?? 'Something went wrong. Please try again.',
        });
        this.isLoading.set(false);
      },
    });
  }

  onClear(): void {
    this.description.set('');
    this.suggestion.set(null);
    this.hasSubmitted.set(false);
  }
}
