import { Provider } from '@nestjs/common';

import { USER_FINDER, USER_SECURITY } from '../application';
import { UserFinder } from './services';
import { UserSecurity } from './services/user-security.service';

export const userProviders: Provider[] = [
  {
    provide: USER_FINDER,
    useClass: UserFinder,
  },
  {
    provide: USER_SECURITY,
    useClass: UserSecurity,
  },
];
