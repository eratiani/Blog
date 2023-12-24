import { Injectable } from '@angular/core';
import { ICardItem, IcardWithEmail } from '../dto/card-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { firstValueFrom } from 'rxjs';

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
        {
          id: 1,
          name: 'Category name2',
          text_color: 'red',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 2,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 2,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 3,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 3,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 4,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 4,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
    {
      id: 5,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 5,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
    },
  ];
  APIURL!: string;
  cardItemWithEmailMockData: IcardWithEmail[] = [
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
        {
          id: 1,
          name: 'Category name2',
          text_color: 'red',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
      email: 'gigagiorgadze@redberry.ge',
    },
    {
      id: 2,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 2,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
      email: 'gigagiorgadze@redberry.ge',
    },
    {
      id: 3,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 3,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
      email: 'gigagiorgadze@redberry.ge',
    },
    {
      id: 4,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 4,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
      email: 'gigagiorgadze@redberry.ge',
    },
    {
      id: 5,
      title: 'Blog title',
      description: 'Blog description',
      image: 'https://via.placeholder.com/150',
      publish_date: '2023-11-19 00:00:00',
      categories: [
        {
          id: 5,
          name: 'Category name',
          text_color: '#ffffff',
          background_color: '#000000',
        },
      ],
      author: 'გელა გელაშვილი',
      email: 'gigagiorgadze@redberry.ge',
    },
  ];
  constructor(private httpClient: HttpClient) {
    this.APIURL = environment.apiUrl;
    console.log(this.getCards2());
  }
  async getCards2() {
    try {
      const request = await firstValueFrom(
        this.httpClient.get(`${this.APIURL}/blogs`, {})
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  getCards() {
    return [...this.cardItemWithEmailMockData];
  }
  getCard(id: number) {
    return this.cardItemWithEmailMockData.filter((card) => card.id === id);
  }
  addCard(card: IcardWithEmail) {
    // send request to server
    this.cardItemWithEmailMockData.push(card);
  }
}
