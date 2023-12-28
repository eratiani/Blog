import { Injectable } from '@angular/core';
import {
  ICardItem,
  IResponseDTO,
  IcardWithEmail,
} from '../dto/card-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards = new Subject<ICardItem[]>();

  APIURL!: string;

  constructor(
    private httpClient: HttpClient,
    private localStorageS: LocalStorageService
  ) {
    this.APIURL = environment.apiUrl;
    const sortedCards = this.localStorageS.getItem('cards');
    this.getCards().then((req) => {
      this.cards.next(sortedCards || req.data);
    });
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
