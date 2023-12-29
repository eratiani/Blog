import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CardService } from '../shared/service/card.service';
import { ICardItem } from '../shared/dto/card-item.model';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnDestroy {
  catSelectedIdArr!: number[];
  cards: ICardItem[] = [];
  cardsSub!: Subscription;
  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private localStorageS: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.cardsSub = this.cardService.cards.subscribe(
      (cards) => (this.cards = this.filterCards(cards))
    );
    this.cardService.getCards().then((res) => {
      const filteredCards = this.localStorageS.getItem('cards');
      if (filteredCards) {
        this.cards = this.filterCards(filteredCards);
      } else {
        this.cards = this.route.snapshot.data['cards'].data || [...res.data];
        this.cards = this.filterCards(this.cards);
      }
    });
  }
  filterCards(cards: ICardItem[]) {
    return cards.filter((card) => new Date(card.publish_date) < new Date());
  }
  ngOnDestroy(): void {
    this.cardsSub.unsubscribe();
  }
}
