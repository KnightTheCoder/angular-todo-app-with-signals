import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (comp) => comp.HomePageComponent
      ),
    title: 'HomePage'
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./pages/todos/todos.component').then(
        (comp) => comp.TodosComponent
      ),
    title: 'TodosPage'
  },
  {
    path: 'todos-with-component',
    loadComponent: () =>
      import(
        './pages/todos-with-component/todos-with-component.component'
      ).then((comp) => comp.TodosWithComponentComponent),
    title: 'Todos with component page'
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-todos/search-todos.component').then(
        (comp) => comp.SearchTodosComponent
      ),
    title: 'SearchPage'
  },
  {
    path: 'todos/:id',
    loadComponent: () =>
      import('./pages/todo-details/todo-details.component').then(
        (comp) => comp.TodoDetailsComponent
      ),
    title: 'Todo details page'
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./pages/shop/shop.component').then((comp) => comp.ShopComponent),
    title: 'ShopPage'
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./pages/order-form/order-form.component').then(
        (comp) => comp.OrderFormComponent
      ),
    title: 'Order form page'
  }
];
