import { Component, effect } from '@angular/core';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';
import { MaskPanPipe } from '../../pipes/mask-pan.pipe';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, MaskPanPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})

export class CardListComponent {
  cartes: Card[] = [];

  constructor(private cardService: CardService) {
    effect(() => {
      this.cartes = this.cardService.getCartes()();
    });
  }

  deleteCarte(index: number) {
    this.cardService.delCarte(index);
  }
}