import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/service/card.service';
import { ICardItem } from '../shared/dto/card-item.model';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css'],
})
export class CardContentComponent {
  currentCard: ICardItem;
  constructor(private route: ActivatedRoute, private cardService: CardService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentCard = this.cardService.mockData.filter(
      (card) => card.id === id
    )[0];
  }
}
