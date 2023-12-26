import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/service/card.service';
import {
  ICardItem,
  IResponseDTO,
  IcardWithEmail,
} from '../shared/dto/card-item.model';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css'],
})
export class CardContentComponent implements OnInit {
  currentCard!: ICardItem;
  currentCards!: IcardWithEmail[];
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));

      try {
        this.currentCard = await this.cardService.getCard(id);
        const response = await this.cardService.getCards();
        this.currentCards = [...response.data];
      } catch (error) {}
      console.log(this.currentCard);
    });
  }
}
