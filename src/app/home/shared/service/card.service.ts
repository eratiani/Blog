import { Injectable } from '@angular/core';
import {
  ICardItem,
  IResponseDTO,
  IcardWithEmail,
} from '../dto/card-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable, firstValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';

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
          title: 'Category title',
          text_color: '#ffffff',
          background_color: '#000000',
        },
        {
          id: 1,
          title: 'Category title2',
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
          title: 'Category title',
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
          title: 'Category title',
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
          title: 'Category title',
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
          title: 'Category title',
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
          title: 'Category title',
          text_color: '#ffffff',
          background_color: '#000000',
        },
        {
          id: 1,
          title: 'Category title2',
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
          title: 'Category title',
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
          title: 'Category title',
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
          title: 'Category title',
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
          title: 'Category title',
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
  }
  async getCards(): Promise<IResponseDTO> {
    try {
      const request = (await firstValueFrom(
        this.httpClient.get(`${this.APIURL}/blogs`, {})
      )) as IResponseDTO;
      return request;
    } catch (error) {
      throw error;
    }
  }

  async getCard(id: number) {
    try {
      const request = (await firstValueFrom(
        this.httpClient.get(`${this.APIURL}/blogs/${id}`, {})
      )) as ICardItem;
      return request;
    } catch (error) {
      throw error;
    }
    // return this.cardItemWithEmailMockData.filter((card) => card.id === id);
  }
  async addCard(card: FormData) {
    // this.cardItemWithEmailMockData.push(card);

    try {
      const request = await firstValueFrom(
        this.httpClient.post(`${this.APIURL}/blogs`, card)
      );
      return request;
    } catch (error) {
      throw error;
    }

    // send request to server
  }
}
