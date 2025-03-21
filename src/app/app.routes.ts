import { Routes } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilsService } from './shared/utils/services/utils.service';
import { UsersService } from './shared/utils/services/users.service';

export const routes: Routes = [
  {
    path: '',
    component: PaginationComponent,
    providers: [UtilsService, UsersService],
  },
];
