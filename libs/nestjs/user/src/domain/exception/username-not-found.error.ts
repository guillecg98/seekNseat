import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { Username } from '../model';

export class UsernameNotFoundError extends DomainError {
  public static with(username: Username): UsernameNotFoundError {
    return new UsernameNotFoundError(`Username ${username.value} not found`);
  }
}
