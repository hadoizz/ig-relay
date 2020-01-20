import { Account } from '../entities/account.entity';

describe('Account', () => {
  it('should be defined', () => {
    expect(new Account()).toBeDefined();
  });
});
