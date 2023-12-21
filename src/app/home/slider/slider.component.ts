import { Component, Input } from '@angular/core';
import { CardService } from '../shared/service/card.service';
import { IcardWithEmail } from '../shared/dto/card-item.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() currentCard!: IcardWithEmail;
  constructor(private cardService: CardService) {}
}
