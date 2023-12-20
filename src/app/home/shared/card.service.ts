import { Injectable } from '@angular/core';
import { ICardItem } from './dto/card-item.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  mockData: ICardItem[] = [
    {
      id: 1,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 1,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 1,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 1,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 1,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 1,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 1,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 1,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 1,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 1,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
  ];
  constructor() {}
}
