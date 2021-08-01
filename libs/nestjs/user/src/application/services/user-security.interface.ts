export const USER_SECURITY = 'USER_SECURITY';

export interface IUserSecurity {
  encodePassword(password: string): Promise<string>;
}
