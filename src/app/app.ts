import { Component, signal } from '@angular/core';
import { ListingFormComponent } from '@components/listing-form/listing-form';

@Component({
  selector: 'app-root',
  imports: [ListingFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('list-alchemist');
}
