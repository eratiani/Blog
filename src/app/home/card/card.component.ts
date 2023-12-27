import { Component, Input, OnInit } from '@angular/core';
import { ICardItem } from '../shared/dto/card-item.model';
import { ISortItem } from '../shared/dto/sort-item.model';
import { CardService } from '../shared/service/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() currentCard!: ICardItem;
  categories!: ISortItem[];
  constructor(private cardService: CardService, private router: Router) {}
  ngOnInit(): void {
    console.log(this.currentCard);
  }
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
