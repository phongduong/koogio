import { SercureApiMiddleware } from './sercure-api.middleware';

describe('SercureApiMiddleware', () => {
  it('should be defined', () => {
    expect(new SercureApiMiddleware()).toBeDefined();
  });
});
