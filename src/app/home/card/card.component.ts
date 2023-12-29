import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ICardItem } from '../shared/dto/card-item.model';
import { ISortItem } from '../shared/dto/sort-item.model';
import { CardService } from '../shared/service/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() currentCard!: ICardItem;
  categories!: ISortItem[];
  constructor(private cardService: CardService, private router: Router) {}

  onNavigateToCard(event: Event) {
    const categoriesId = this.currentCard.categories.map((card) => card.id);
    event.preventDefault();
    this.updateCards(categoriesId);
    this.router.navigate(['/Home', this.currentCard.id]);
  }
  filterCards(cardItem: ICardItem[], soretedCategoriesId: number[]) {
    const cardsWithoutCurrCard = cardItem.filter(
      (card) => card.id !== this.currentCard.id
    );
    return [
      ...cardsWithoutCurrCard.filter((cardItem) =>
        cardItem.categories.some((category) => {
          const isIncluded = soretedCategoriesId.includes(category.id);
          return isIncluded;
        })
      ),
    ];
  }
  private updateCards(soretedCategoriesId: number[]): void {
    this.cardService.getCards().then((res) => {
      this.cardService.cards.next(
        this.filterCards(res.data, soretedCategoriesId)
      );
    });
  }
}
