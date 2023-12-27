import { Component, Input, OnInit } from '@angular/core';
import { ICardItem } from '../shared/dto/card-item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() currentCard!: ICardItem;
  constructor() {}
  ngOnInit(): void {
    console.log(this.currentCard);
  }
}
