import { Username } from './username';

describe('Username', () => {
  it('should have email format', () => {
    expect(Username.fromString('guillecosano42@gmail.com').value).toBe('guillecosano42@gmail.com');
  });

  it('should not be empty', () => {
    expect(() => {
      Username.fromString('');
    }).toThrow();
  });
});
