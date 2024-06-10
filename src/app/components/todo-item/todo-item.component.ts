import { Component, effect, input, output, signal } from '@angular/core';
import { Todo } from '../../models/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  template: ` <li [className]="todo().isCompleted ? 'completed' : ''">
    <input
      type="checkbox"
      [checked]="todo().isCompleted"
      (click)="toggleCompleteTodo()"
    />
    {{ todo().name }}

    @if(editedTodo() === todo().id) {
    <form
      style="display: inline-block;"
      (ngSubmit)="updateTodo()"
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
      (click)="toggleEdit(todo().id)"
    >
      Edit
    </button>
    }

    <button
      class="btn-delete"
      (click)="deleteTodo()"
    >
      X
    </button>
  </li>`,
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  editedTodo = input.required<number>();
  editTodoName = signal('');

  onCompleteTodo = output<Todo>();
  onUpdateTodo = output<Todo>();
  onToggleEdit = output<number>();
  onDeleteTodo = output<number>();

  constructor() {
    effect(
      () => {
        if (this.editedTodo() === this.todo().id) {
          this.editTodoName.set(this.todo().name);
        }
      },
      { allowSignalWrites: true }
    );
  }

  toggleCompleteTodo() {
    this.onCompleteTodo.emit(this.todo());
  }

  updateTodo() {
    let updatedTodo = { ...this.todo(), name: this.editTodoName() };
    this.onUpdateTodo.emit(updatedTodo);
    // this.editTodoName.set('');
  }

  toggleEdit(id: number) {
    this.onToggleEdit.emit(id);

    // if (id !== -1) {
    //   this.editTodoName.set(this.todo().name);
    // }
  }

  deleteTodo() {
    this.onDeleteTodo.emit(this.todo().id);
  }
}
