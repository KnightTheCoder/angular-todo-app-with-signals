import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodosWithComponentComponent } from './pages/todos-with-component/todos-with-component.component';
import { SearchTodosComponent } from './pages/search-todos/search-todos.component';
import { TodoDetailsComponent } from './pages/todo-details/todo-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'HomePage'
  },
  {
    path: 'todos',
    component: TodosComponent,
    title: 'TodosPage'
  },
  {
    path: 'todos-with-component',
    component: TodosWithComponentComponent,
    title: 'Todos with component page'
  },
  {
    path: 'search',
    component: SearchTodosComponent,
    title: 'SearchPage'
  },
  {
    path: 'todos/:id',
    component: TodoDetailsComponent,
    title: 'Todo details page'
  }
];
