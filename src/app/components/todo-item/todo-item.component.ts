import { Component, input, model, output } from '@angular/core';
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
  editTodoName = model.required<string>();

  onCompleteTodo = output<Todo>();
  onUpdateTodo = output<Todo>();
  onToggleEdit = output<number>();
  onDeleteTodo = output<number>();

  toggleCompleteTodo() {
    this.onCompleteTodo.emit(this.todo());
  }

  updateTodo() {
    let updatedTodo = { ...this.todo(), name: this.editTodoName() };
    this.onUpdateTodo.emit(updatedTodo);
  }

  toggleEdit(id: number) {
    this.onToggleEdit.emit(id);
  }

  deleteTodo() {
    this.onDeleteTodo.emit(this.todo().id);
  }
}
