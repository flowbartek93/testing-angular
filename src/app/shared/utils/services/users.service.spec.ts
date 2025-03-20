import { UsersService } from './users.service';
import { UserInterface } from '../types/ui.model';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UsersService', () => {
  let userSrv: UsersService;

  //!mockowanie
  // const utilsSrvMock = {
  //   pluck: jest.fn(),
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
    });

    userSrv = TestBed.inject(UsersService);
  });

  it('src created', () => {
    expect(userSrv).toBeTruthy();
  });

  describe('addUser', () => {
    it('shoulda add user', () => {
      const user: UserInterface = {
        id: '32',
        name: 'lol',
      };

      userSrv.addUser(user);

      expect(userSrv.users$.getValue()).toContain(user);
    });

    it('shoulda remove users', () => {
      userSrv.users$.next([{ id: '3', name: 'usuwanue' }]);
      userSrv.removeUser('3');

      expect(userSrv.users$.getValue()).toEqual([]);
    });

    // it('shoulda get user names', () => {
    //   jest.spyOn(utilsSrv, 'pluck');

    //   userSrv.addUser({ id: '3', name: 'bartek' });
    //   // utilsSrvMock.pluck.mockReturnValue(['foo']); // mock
    //   expect(userSrv.getUserNames()).toEqual(['bartek']);

    //   expect(utilsSrv.pluck).toHaveBeenCalledWith(userSrv.users, 'name');
    // });
  });
});
