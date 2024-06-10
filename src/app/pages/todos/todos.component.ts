import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule],
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
      (click)="hideCompletedTodos.set(!hideCompletedTodos())"
    >
      {{ hideCompletedTodos() ? 'Show all todos' : 'Hide completed todos' }}
    </button>

    <div>
      @if (filteredTodos().length) {
      <ul>
        @for (todo of filteredTodos(); track todo.id) {
        <li [className]="todo.isCompleted ? 'completed' : ''">
          <input
            type="checkbox"
            [(ngModel)]="todo.isCompleted"
            (click)="toggleCompleteTodo(todo)"
          />
          {{ todo.name }}

          @if(editedTodo() === todo.id) {
          <form
            style="display: inline-block;"
            (ngSubmit)="updateTodo(todo)"
          >
            <input
              type="text"
              [(ngModel)]="editTodoName"
              [ngModelOptions]="{ standalone: true }"
              placeholder="Enter a new todo"
            />
            <button class="btn-edit">Save changes</button>
            <button
              class="btn-cancel"
              (click)="toggleEdit(-1)"
            >
              Cancel
            </button>
          </form>
          } @else {
          <button
            class="btn-edit"
            (click)="toggleEdit(todo.id)"
          >
            Edit
          </button>
          }

          <button
            class="btn-delete"
            (click)="deleteTodo(todo.id)"
          >
            X
          </button>
        </li>
        <br />
        }
      </ul>
      } @else {
      <h2>There aren't any todos left...</h2>
      }
    </div>
  `,
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todosService: TodosService = inject(TodosService);
  newTodoName = signal('');
  editTodoName = signal('');
  hideCompletedTodos = signal(false);
  editedTodo = signal(-1);
  filteredTodos = computed(() =>
    this.hideCompletedTodos()
      ? this.todosService.todos().filter((todo) => !todo.isCompleted)
      : this.todosService.todos()
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

    if (id !== -1)
      this.editTodoName.set(this.todosService.getTodoById(id)?.name ?? '');
  }

  updateTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, name: this.editTodoName() });
    this.editTodoName.set('');
    this.toggleEdit(-1);
  }
}
