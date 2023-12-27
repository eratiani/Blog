import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/service/card.service';
import {
  ICardItem,
  IResponseDTO,
  IcardWithEmail,
} from '../shared/dto/card-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css'],
})
export class CardContentComponent implements OnInit, OnDestroy {
  currentCard!: ICardItem;
  currentCards!: IcardWithEmail[];
  cardsSubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));

      try {
        this.currentCard = await this.cardService.getCard(id);
        this.cardsSubs = this.cardService.cards.subscribe(
          (data) => (this.currentCards = [...data])
        );
      } catch (error) {}
      console.log(this.currentCard);
    });
  }

  ngOnDestroy(): void {
    this.cardsSubs.unsubscribe();
  }
}
