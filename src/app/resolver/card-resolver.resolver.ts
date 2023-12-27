import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CardService } from '../home/shared/service/card.service';
import { IResponseDTO } from '../home/shared/dto/card-item.model';

@Injectable({
  providedIn: 'root',
})
export class CardResolverResolver implements Resolve<IResponseDTO> {
  constructor(private cardService: CardService) {}

  resolve() {
    return this.cardService.getCards();
  }
}
