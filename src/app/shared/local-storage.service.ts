import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): boolean {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
