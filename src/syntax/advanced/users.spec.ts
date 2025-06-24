import { describe, it, expect } from 'vitest';
import { saveUser, UserCreate, validateUser } from './users';

describe('Working with Users', () => {
  it('creating, validating, saving users', () => {
    const userToCreate: UserCreate = {
      name: 'Jill Smith',
      age: 12,
      email: 'jill@aol.com',
    };

    const validUser = validateUser(userToCreate);
    saveUser(validUser);
  });
});
