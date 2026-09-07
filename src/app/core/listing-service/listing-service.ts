import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ListingSuggestion {
  title: string;
  tags: string[];
  priceRange: string;
  confidenceNote?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ListingService {
  private readonly apiUrl = `${environment.apiUrl}/listing/suggest`;

  constructor(private http: HttpClient) {}

  getSuggestion(description: string): Observable<ListingSuggestion> {
    return this.http.post<ListingSuggestion>(this.apiUrl, { description });
  }
}
