import { Component, computed, inject, signal } from '@angular/core';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos-with-component',
  standalone: true,
  imports: [FormsModule, TodoItemComponent],
  template: `
    <form
      class="form-add"
      (ngSubmit)="submitTodo()"
    >
      <input
        type="text"
        [(ngModel)]="newTodoName"
        [ngModelOptions]="{ standalone: true }"
        placeholder="Enter a new todo"
      />
      <button type="submit">Create</button>
    </form>

    <button
      class="completed-button"
      (click)="showOnlyCompletedTodos.set(!showOnlyCompletedTodos())"
    >
      {{
        showOnlyCompletedTodos()
          ? 'Show all todos'
          : 'Show only completed todos'
      }}
    </button>

    <div>
      <ul>
        @for (todo of filteredTodos(); track todo.id) {
        <app-todo-item
          [todo]="todo"
          [editedTodo]="editedTodo()"
          (onCompleteTodo)="toggleCompleteTodo($event)"
          (onToggleEdit)="toggleEdit($event)"
          (onDeleteTodo)="deleteTodo($event)"
          (onUpdateTodo)="updateTodo($event)"
        ></app-todo-item>
        <br />
        }
      </ul>
    </div>
  `,
  styleUrl: './todos-with-component.component.css'
})
export class TodosWithComponentComponent {
  todosService: TodosService = inject(TodosService);
  newTodoName = signal('');
  showOnlyCompletedTodos = signal(false);
  editedTodo = signal(-1);
  filteredTodos = computed(() =>
    this.showOnlyCompletedTodos()
      ? this.todosService
          .todos()()
          .filter((todo) => !todo.isCompleted)
      : this.todosService.todos()()
  );

  submitTodo() {
    const newTodo: Todo = {
      id: -1,
      name: this.newTodoName(),
      isCompleted: false
    };

    this.todosService.createTodo(newTodo);
    this.newTodoName.set('');
  }

  toggleCompleteTodo(todo: Todo) {
    const updatedTodo: Todo = { ...todo, isCompleted: !todo.isCompleted };
    this.todosService.updateTodo(updatedTodo);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodoById(id);
  }

  toggleEdit(id: number) {
    this.editedTodo.set(id);
  }

  updateTodo(todo: Todo) {
    this.todosService.updateTodo(todo);
    this.toggleEdit(-1);
  }
}
