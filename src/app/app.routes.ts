import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodosWithComponentComponent } from './pages/todos-with-component/todos-with-component.component';

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
    title: 'Todos with component'
  }
];
