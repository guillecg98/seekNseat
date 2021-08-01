import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { Username } from '../model';

export class UsernameAlreadyTakenError extends DomainError {
  public static with(username: Username): UsernameAlreadyTakenError {
    return new UsernameAlreadyTakenError(
      `Username ${username.value} already taken`
    );
  }
}
