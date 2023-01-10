export type User = {
  username: string;
  password: string;
};

const users = new Map<User['username'], User['password']>();

users.set('user1', 'pass123');
users.set('Test', 'aaa');
users.set('test!', 'secret');
users.set('test?user', '1234');

export default users;