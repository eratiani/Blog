import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CardService } from '../shared/service/card.service';
import { ICardItem } from '../shared/dto/card-item.model';
import { ISortItem } from '../shared/dto/sort-item.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnChanges, OnDestroy {
  catSelectedIdArr!: number[];
  cards: ICardItem[] = [];
  cardsSub!: Subscription;
  constructor(private cardService: CardService, private route: ActivatedRoute) {
    console.log(this.route.snapshot.data);

    this.cards = this.route.snapshot.data['cards'].data;
  }
  ngOnInit(): void {
    this.cardsSub = this.cardService.cards.subscribe(
      (cards) => (this.cards = [...cards])
    );

    // this.cardService.getCards().then((res) => (this.cards = [...res.data]));
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.catSelectedIdArr);
    // if (changes['catSelectedIdArr']) {
    //   console.log(this.catSelectedIdArr);
    //   // this.updateCards();
    // }
  }
  ngOnDestroy(): void {
    this.cardsSub.unsubscribe();
  }
}
