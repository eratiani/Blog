import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { SorterComponent } from './sorter/sorter.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    BlogComponent,
    SorterComponent,
    CardsComponent,
    CardComponent,
    SliderComponent,
  ],
  imports: [CommonModule, CoreModule],
})
export class HomeModule {}
