import { Component, Input } from '@angular/core';
import { CardService } from '../shared/service/card.service';
import { ICardItem, IcardWithEmail } from '../shared/dto/card-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() currentCard!: IcardWithEmail;
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
