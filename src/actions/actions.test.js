import * as actions from './index';

console.log(actions.setPage(1));
describe('set page action', () => {
  it('should create set page action', () => {
    expect(actions.setPage(1)).toEqual({
      type: 'SET_PAGE',
      page: 1
    });
  });
});