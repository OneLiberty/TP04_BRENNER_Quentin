import { Component } from '@angular/core';
import { FooterComponent } from "./components/footer/footer.component";
import { TetiereComponent } from "./components/tetiere/tetiere.component";
import { CardFormComponent } from "./components/card-form/card-form.component";
import { CardListComponent } from './components/card-list/card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, TetiereComponent, CardFormComponent, CardListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';
}