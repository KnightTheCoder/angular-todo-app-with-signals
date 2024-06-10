import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private internalTodos: WritableSignal<Todo[]>;
  private idCounter = computed(() => this.internalTodos().length + 1);

  constructor() {
    this.internalTodos = signal<Todo[]>([
      {
        id: 1,
        name: 'Complete me please',
        isCompleted: false
      }
    ]);
  }

  public todos = computed(() => {
    return this.internalTodos;
  });

  getAllTodos(): Todo[] {
    return this.internalTodos();
  }

  getTodoById(id: number): Todo | undefined {
    let foundTodo = this.internalTodos().find((todo) => todo.id === id);

    return foundTodo;
  }

  createTodo(todo: Todo) {
    if (todo.name.trim() === '') return;

    this.internalTodos.update((todosArray) => [
      ...todosArray,
      { ...todo, id: this.idCounter() }
    ]);
  }

  updateTodo(todo: Todo) {
    if (todo.name.trim() === '') return;

    this.internalTodos.update((todos) =>
      todos.map((item) => {
        if (item.id == todo.id) {
          return todo;
        } else {
          return item;
        }
      })
    );
  }

  deleteTodoById(id: number) {
    this.internalTodos.update((todos) =>
      todos.filter((todo) => todo.id !== id)
    );
  }
}
