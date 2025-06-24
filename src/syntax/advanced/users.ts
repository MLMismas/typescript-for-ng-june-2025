type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

type ValidatedUser = UserCreate;

export type UserCreate = Pick<User, 'name' | 'email' | 'age'>;

export function validateUser(userToCreate: UserCreate) {
  if (userToCreate.name.trim().length < 4) {
    throw new Error('Bad User Name - needs ....');
  }
  if (userToCreate.age < 14) {
    throw new Error('Buzz off kid');
  }
  return userToCreate as ValidatedUser;
}

export function saveUser(user: ValidatedUser) {
  //todo
}
