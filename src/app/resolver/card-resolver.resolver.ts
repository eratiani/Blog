import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CardService } from '../home/shared/service/card.service';
import { IResponseDTO } from '../home/shared/dto/card-item.model';
import { AuthenticationService } from '../core/service/authentication.service';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CardResolverResolver implements Resolve<IResponseDTO> {
  constructor(
    private cardService: CardService,
    private headerService: AuthenticationService,
    private localStorageS: LocalStorageService
  ) {}

  resolve() {
    this.localStorageS.getItem('isLoggedIn') &&
      this.headerService.isLogedIn.next(true);
    this.headerService.isHomePage.next(true);
    return this.cardService.getCards();
  }
}
