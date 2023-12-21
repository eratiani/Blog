import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/service/card.service';
import { ICardItem, IcardWithEmail } from '../shared/dto/card-item.model';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css'],
})
export class CardContentComponent implements OnInit {
  currentCard!: IcardWithEmail;
  currentCards!: IcardWithEmail[];
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.currentCard = this.cardService.cardItemWithEmailMockData.filter(
        (card) => card.id === id
      )[0];
      this.currentCards = this.cardService.getCards();
    });
  }
}
