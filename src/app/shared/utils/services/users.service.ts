import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../types/ui.model';
import { UtilsService } from './utils.service';

@Injectable()
export class UsersService {
  users: UserInterface[] = [];

  utils = inject(UtilsService);

  addUser(user: UserInterface) {
    this.users = [...this.users, user];
  }

  removeUser(userId: string) {
    const updatedUsers = this.users.filter((user) => userId !== user.id);
    this.users = updatedUsers;
  }

  getUserNames(): string[] {
    return this.utils.pluck(this.users, 'name');
  }
}
