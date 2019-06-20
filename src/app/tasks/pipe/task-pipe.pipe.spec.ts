import { TaskPipe } from './task-pipe.pipe';

describe('TaskPipePipe', () => {
  it('create an instance', () => {
    const pipe = new TaskPipe();
    expect(pipe).toBeTruthy();
  });
});
