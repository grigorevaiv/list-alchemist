import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListingService, ListingSuggestion } from '@core/listing-service/listing-service';
import { trimmedStringLengthValidator } from '@core/validators/trimmed-string-length.validator';

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './listing-form.html',
  styleUrl: './listing-form.css',
})
export class ListingFormComponent {
  private listingService = inject(ListingService);

  form = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: trimmedStringLengthValidator(20, 500),
    }),
  });

  suggestion = signal<ListingSuggestion | null>(null);
  isLoading = signal(false);
  hasSubmitted = signal(false);

  get descriptionInput() {
    return this.form.controls.description;
  }

  private readonly descriptionValue = toSignal(this.form.controls.description.valueChanges, {
    initialValue: '',
  });

  characterCount = computed(() => this.descriptionValue().trim().length);

  get validationError(): string | null {
    const errors = this.descriptionInput.errors;
    if (!errors) return null;
    if (errors['required']) return 'Description is required';
    if (errors['tooShort']) return 'Description is too short';
    if (errors['tooLong']) return 'Description is too long';
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }

    const trimmed = this.descriptionInput.value.trim();
    this.isLoading.set(true);
    this.hasSubmitted.set(true);
    this.suggestion.set(null);

    this.listingService.getSuggestion(trimmed).subscribe({
      next: (result) => {
        this.suggestion.set(result);
        this.isLoading.set(false);
      },
      error: () => {
        this.suggestion.set({
          title: '',
          tags: [],
          priceRange: '',
          error: 'Something went wrong - please try again',
        });
        this.isLoading.set(false);
      },
    });
  }

  onClear(): void {
    this.form.reset();
    this.suggestion.set(null);
    this.hasSubmitted.set(false);
  }
}
