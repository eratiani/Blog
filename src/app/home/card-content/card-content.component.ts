import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/service/card.service';
import {
  ICardItem,
  IResponseDTO,
  IcardWithEmail,
} from '../shared/dto/card-item.model';
import { Subscription } from 'rxjs';
import { ISortItem } from '../shared/dto/sort-item.model';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

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
  cardsLength: number = 0;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private localStorageS: LocalStorageService
  ) {}
  ngOnInit() {
    this.localStorageS.deleteItem('cards');
    this.localStorageS.deleteItem('categoryId');
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      this.currentIndex = 0;
      try {
        this.currentCard = await this.cardService.getCard(id);
        console.log(this.currentCard);
        this.cardsSubs = this.cardService.cards.subscribe((data) => {
          this.currentCards = this.filterCards(data, id);
          const catId = this.currentCard.categories.map((cat) => cat.id);
          this.currentCards = this.filterCardsByCategory(
            this.currentCards,
            catId
          );
          if (this.currentCards.length <= 3) {
            this.disableRight = true;
          } else {
            this.disableRight = false;
          }
        });
      } catch (error) {}
    });
  }
  filterCardsByCategory(cards: ICardItem[], category: number[]) {
    return cards.filter((cardItem) =>
      cardItem.categories.some((cat) => {
        const isIncluded = category.includes(cat.id);
        return isIncluded;
      })
    );
  }
  filterCards(cards: ICardItem[], id: number) {
    return cards.filter(
      (card) => new Date(card.publish_date) < new Date() && card.id !== id
    );
  }
  moveLeft() {
    const arrowLeft = document.getElementById('left') as HTMLElement;
    console.log(this.currentCards);

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
          arrowRight.classList.contains('disable') ||
            arrowRight.classList.remove('disable');
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

  moveRight() {
    console.log(this.currentCards);

    const arrowLeft = document.getElementById('left') as HTMLElement;
    if (this.currentIndex < this.currentCards.length - 3) {
      this.currentIndex++;
      const removedCard = this.currentCards.shift();
      if (!removedCard) return;
      arrowLeft.classList.contains('disable') &&
        arrowLeft.classList.remove('disable');
      this.currentCards.push(removedCard);
      this.disableLeft = false;
      if (this.currentIndex === this.currentCards.length - 3) {
        this.disableRight = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.cardsSubs.unsubscribe();
  }
}
