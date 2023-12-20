import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { SorterComponent } from './sorter/sorter.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { CoreModule } from '../core/core.module';
import { CardContentComponent } from './card-content/card-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BlogComponent,
    SorterComponent,
    CardsComponent,
    CardComponent,
    SliderComponent,
    CardContentComponent,
  ],
  imports: [CommonModule, CoreModule, RouterModule],
})
export class HomeModule {}
