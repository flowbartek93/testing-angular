import { Routes } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilsService } from './shared/utils/services/utils.service';
import { UsersService } from './shared/utils/services/users.service';
import { MainComponent } from './todos/components/main/main.component';
import { TodoComponent } from './todos/components/todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    providers: [UtilsService, UsersService],
  },
];
