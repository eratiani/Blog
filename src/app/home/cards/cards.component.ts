import { Component } from '@angular/core';
import { CardService } from '../shared/service/card.service';
import { ICardItem } from '../shared/dto/card-item.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  cards: ICardItem[] = [];
  constructor(private cardService: CardService) {}
  ngOnInit(): void {
    this.cards = this.cardService.mockData;
  }
}
