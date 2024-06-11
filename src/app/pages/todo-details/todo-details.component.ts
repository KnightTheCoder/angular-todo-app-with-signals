import { Component, computed, effect, inject, signal } from '@angular/core';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [InfoCardComponent, RouterModule],
  template: `
    <div>
      <app-info-card>
        <p id="id">Id: {{ todo()?.id }}</p>
        <p id="name">Name: {{ todo()?.name }}</p>
        <p id="complete">Status: {{ status() }}</p>
      </app-info-card>
      <button
        class="btn-delete"
        (click)="deleteTodo()"
      >
        Delete
      </button>
      <a routerLink="/search">Back to search page</a>
    </div>
  `,
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  todosService = inject(TodosService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  todo = signal<Todo | undefined>(undefined);
  todoId = signal(0);
  status = computed(() =>
    this.todo()?.isCompleted ? 'completed' : 'incomplete'
  );

  constructor() {
    this.todoId.set(Number(this.activatedRoute.snapshot.params['id']));
    this.todo.set(this.todosService.getTodoById(this.todoId()));

    effect(() => {
      if (!this.todo()) {
        this.router.navigate(['search']);
      }
    });
  }

  deleteTodo() {
    if (this.todo()?.id) {
      this.todosService.deleteTodoById(this.todoId());
      this.router.navigate(['search']);
    }
  }
}
