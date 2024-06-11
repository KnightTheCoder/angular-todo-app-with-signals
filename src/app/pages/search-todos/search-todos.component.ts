import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-todos',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <h1>Search among todos</h1>
    <input
      type="text"
      [(ngModel)]="searchQuery"
    />

    <div>
      @if (searchedTodos().length) { @for (todo of searchedTodos(); track
      todo.id) {
      <div
        class="item"
        (click)="gotoTodo(todo.id)"
      >
        {{ todo.name }}
      </div>
      } } @else {
      <h3>No todos match your query</h3>
      }
    </div>
  `,
  styleUrl: './search-todos.component.css'
})
export class SearchTodosComponent {
  todosService = inject(TodosService);
  router = inject(Router);

  searchQuery = signal('');
  searchedTodos = computed(() =>
    this.todosService
      .todos()
      .filter((todo) =>
        todo.name.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
  );

  gotoTodo(id: number) {
    this.router.navigate(['todos', id]);
  }
}
