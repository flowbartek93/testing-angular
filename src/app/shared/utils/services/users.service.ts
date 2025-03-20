import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../types/ui.model';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  users: UserInterface[] = [];

  users$ = new BehaviorSubject<UserInterface[]>([]);

  addUser(user: UserInterface) {
    // this.users = [...this.users, user];

    this.users$.next([...this.users$.getValue(), user]);
  }

  removeUser(userId: string) {
    const updatedUsers = this.users$
      .getValue()
      .filter((user) => userId !== user.id);
    // this.users = updatedUsers;
    this.users$.next(updatedUsers);
  }

  // getUserNames(): string[] {
  //   return this.utils.pluck(this.users, 'name');
  // }
}
