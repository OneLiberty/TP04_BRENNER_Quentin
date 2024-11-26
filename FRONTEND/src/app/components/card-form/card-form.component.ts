import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFormatDirective } from './form-format.directive';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFormatDirective],
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService) {
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$')]]
    });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const newCard: Card = this.cardForm.value;
      // Determine card type based on first digit this should cover most cases
      if (newCard.cardNumber.startsWith('4')) {
        newCard.cardType = 'VISA';
      } else if (newCard.cardNumber.startsWith('5')) {
        newCard.cardType = 'MASTERCARD';
      } else {
        newCard.cardType = 'Unknown';
      }
      this.cardService.addCarte(newCard);
      this.cardForm.reset();
    } else {
      this.cardForm.markAllAsTouched();
      alert('Please fill out the form correctly');
    }
  }
}