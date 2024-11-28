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

  // check if form is valid and add card to the service
  onSubmit() {
    if (this.cardForm.valid) {
      const newCard: Card = {
        ...this.cardForm.value,
        cardType: this.getCardType(this.cardForm.value.cardNumber)
      };
      this.cardService.addCarte(newCard);
      this.cardForm.reset();
    } else {
      this.cardForm.markAllAsTouched();
      this.animateInvalidFields();
    }
  }

  // returned card type is based on the first digit of the card number
  private getCardType(cardNumber: string): string {
    if (cardNumber.startsWith('4')) {
      return 'VISA';
    } else if (cardNumber.startsWith('5')) {
      return 'MASTERCARD';
    } else {
      return 'Unknown';
    }
  }

  // add animation to invalid fields
  private animateInvalidFields() {
    Object.keys(this.cardForm.controls).forEach(field => {
      const control = this.cardForm.get(field);
      const element = document.querySelector(`[formControlName="${field}"]`);
      if (control && control.invalid && element) {
        element.classList.add('error-animation');
        element.addEventListener('animationend', () => {
          element.classList.remove('error-animation');
        });
      }
    });
  }
}