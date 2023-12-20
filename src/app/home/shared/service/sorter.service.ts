import { Injectable } from '@angular/core';
import { ISortItem } from '../dto/sort-item.model';

@Injectable({
  providedIn: 'root',
})
export class SorterService {
  mockData: ISortItem[] = [
    {
      id: 1,
      title: 'მარკეტი',
      text_color: '#FFFFFF',
      background_color: '#FFBB2F',
    },
    {
      id: 2,
      title: 'აპლიკაცია',
      text_color: '#FFFFFF',
      background_color: '#1CD67D',
    },
    {
      id: 3,
      title: 'ხელოვნური ინტელექტი',
      text_color: '#FFFFFF',
      background_color: '#B11CD6',
    },
    {
      id: 4,
      title: 'UI/UX',
      text_color: '#FFFFFF',
      background_color: '#FA5757',
    },
    {
      id: 5,
      title: 'კვლევა',
      text_color: '#FFFFFF',
      background_color: '#70CF25',
    },
    {
      id: 6,
      title: 'Figma',
      text_color: '#FFFFFF',
      background_color: '#08D2AE',
    },
    {
      id: 7,
      title: 'დამზადება',
      text_color: '#FFFFFF',
      background_color: '#08D2AE',
    },
    {
      id: 8,
      title: 'კოპიუტერული მეცნიერება',
      text_color: '#FFFFFF',
      background_color: '#70CF25',
    },
    {
      id: 9,
      title: 'სამუშაო გარემო',
      text_color: '#FFFFFF',
      background_color: '#1CD67D',
    },
    {
      id: 10,
      title: 'მუსიკა',
      text_color: '#FFFFFF',
      background_color: '#08D2AE',
    },
    {
      id: 11,
      title: 'სპორტი',
      text_color: '#FFFFFF',
      background_color: '#FA5757',
    },
    {
      id: 12,
      title: 'სამშენებლო',
      text_color: '#FFFFFF',
      background_color: '#B11CD6',
    },
    {
      id: 13,
      title: 'სამედიცინო',
      text_color: '#FFFFFF',
      background_color: '#FFBB2F',
    },
    {
      id: 14,
      title: 'სხვა',
      text_color: '#FFFFFF',
      background_color: '#FA5757',
    },
  ];
  constructor() {}
}
