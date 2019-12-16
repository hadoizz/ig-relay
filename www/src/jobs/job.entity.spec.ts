import { Job } from './job.entity';

describe('Job.Entity', () => {
  it('should be defined', () => {
    expect(new Job()).toBeDefined();
  });
});
