import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CardService } from '../shared/service/card.service';
import { ICardItem } from '../shared/dto/card-item.model';
import { ISortItem } from '../shared/dto/sort-item.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnChanges {
  @Input() catSelectedIdArr!: number[];
  cards: ICardItem[] = [];
  constructor(private cardService: CardService) {}
  ngOnInit(): void {
    this.cardService.getCards().then((res) => (this.cards = [...res.data]));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.catSelectedIdArr);

    if (changes['catSelectedIdArr']) {
      console.log(this.catSelectedIdArr);

      // this.updateCards();
    }
  }

  private updateCards(): void {
    this.cardService.getCards().then((res) => {
      this.cards = [
        ...res.data.filter((cardItem) =>
          cardItem.categories.forEach((category) =>
            this.catSelectedIdArr.includes(category.id)
          )
        ),
      ];
    });
    console.log(this.cards);
  }
}
