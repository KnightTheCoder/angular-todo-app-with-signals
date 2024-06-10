import { InfoCardComponent } from './../../components/info-card/info-card.component';
import { Todo } from './../../models/todo';
import { Component, computed, signal } from '@angular/core';
import { AddContentComponent } from '../../components/add-content/add-content.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AddContentComponent, InfoCardComponent],
  template: `
    <h1>Welcome to the home page!</h1>

    <label for="displayTodos">Display todos</label>
    <input
      type="checkbox"
      name="displayTodos"
      [(ngModel)]="displayTodos"
    />
    <br />

    @if (displayTodos) { @for (todo of filteredTodos(); track $index) {
    <app-info-card>
      <p id="id">{{ todo.id }}</p>
      <p id="name">{{ todo.name }}</p>
      <p id="complete">{{ todo.isCompleted }}</p>
    </app-info-card>
    } } @else {
    <button (click)="displayContent()">Display content</button>

    @if (isDisplayed) {
    <app-add-content>
      <p>This is passed children!</p>
      <p>{{ passedInfo }}</p>
    </app-add-content>
    } @else {
    <h2>Not displayed</h2>
    <label>Info to pass</label> <br />
    <input
      type="text"
      [(ngModel)]="passedInfo"
    />
    } }
  `,
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  passedInfo = 'this info has been passed';
  isDisplayed = false;
  displayTodos = false;

  todos = signal<Todo[]>([
    {
      id: 1,
      name: 'Complete course',
      isCompleted: false
    },
    {
      id: 2,
      name: 'Do chores',
      isCompleted: true
    }
  ]);

  filteredTodos = computed(() => {
    return this.todos().filter((todo) => !todo.isCompleted);
  });

  displayContent() {
    this.isDisplayed = !this.isDisplayed;
  }
}
