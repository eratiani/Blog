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
  disableLeft: boolean = true;
  disableRight: boolean = false;
  currentIndex: number = 0;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));

      try {
        this.currentCard = await this.cardService.getCard(id);
        this.cardsSubs = this.cardService.cards.subscribe((data) => {
          this.currentCards = this.filterCards(data);
          console.log(this.currentCards.length);

          if (this.currentCards.length <= 3) {
            this.disableRight = true;
          }
        });
      } catch (error) {}
    });
  }
  filterCards(cards: ICardItem[]) {
    return cards.filter((card) => new Date(card.publish_date) < new Date());
  }
  moveLeft(event: Event) {
    const arrowLeft = document.getElementById('left') as HTMLElement;

    const arrowRight = document.getElementById('right') as HTMLElement;
    if (this.currentIndex >= 0) {
      const removedCard = this.currentCards.pop();
      this.currentIndex--;
      if (!removedCard) return;
      arrowRight.classList.contains('disable') &&
        arrowRight.classList.remove('disable');
      this.currentCards.unshift(removedCard);
      if (this.currentIndex === 0) {
        this.disableLeft = true;
        if (this.currentCards.length > 3) {
          arrowLeft.classList.contains('disable') ||
            arrowLeft.classList.remove('disable');
          this.disableRight = false;
        }
        arrowLeft.classList.contains('disable') ||
          arrowLeft.classList.add('disable');
      }
      if (this.currentIndex >= 3) {
        this.disableRight = false;
      }
    }
  }

  moveRight(event: Event) {
    const arrowLeft = document.getElementById('left') as HTMLElement;
    if (this.currentIndex < this.currentCards.length - 1) {
      this.currentIndex++;
      const removedCard = this.currentCards.shift();
      if (!removedCard) return;
      arrowLeft.classList.contains('disable') &&
        arrowLeft.classList.remove('disable');
      this.currentCards.push(removedCard);
      this.disableLeft = false;
      if (this.currentIndex === this.currentCards.length - 1) {
        this.disableRight = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.cardsSubs.unsubscribe();
  }
}
