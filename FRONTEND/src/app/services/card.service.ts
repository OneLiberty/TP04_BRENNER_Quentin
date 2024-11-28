import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { signal } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  private readonly cartesSignal = signal<Card[]>([]);

  constructor() {
    environment.testCards.forEach(card => this.addCarte(card));
  }

  getCartes() {
    return this.cartesSignal;
  }

  
  addCarte(newCard: Card) {
    this.cartesSignal.update(cards => [...cards, newCard]);
  }

  delCarte(index: number) {
    this.cartesSignal.update(cards => {
      const newCards = [...cards];
      newCards.splice(index, 1);
      return newCards;
    });
  }
}